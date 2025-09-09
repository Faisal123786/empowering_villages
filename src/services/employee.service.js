import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import Village from "../models/Village.js";
import stripe from "../config/stripe.js";
import { hashPassword } from "../utils/crypto.js";
import { sendSseEvent } from "../controllers/sse.controller.js";

async function createEmployee(res, { name, email, password, role, area }) {
  sendSseEvent(res, "Starting employee creation...", "START", 10);

  const existingEmployee = await User.findOne({ email });
  if (existingEmployee) {
    sendSseEvent(res, "Employee already exists", "ERROR", 0);
    throw new Error("Employee already exists!");
  }
  const passwordHash = password ? await hashPassword(password) : undefined;
  const newEmployee = new User({
    name,
    email,
    password: passwordHash,
    role,
    area_id: area,
  });
  await newEmployee.save();
  sendSseEvent(res, "Employee created successfully", "EMPLOYEE_CREATED", 30);

  await Village.findByIdAndUpdate(area, { employee_id: newEmployee._id });
  await User.findByIdAndUpdate(newEmployee._id, { area_id: area });

  const account = await stripe.accounts.create({
    type: "express",
    email,
    country: "US",
    capabilities: {
      transfers: { requested: true },
      card_payments: { requested: true },
    },
  });
  sendSseEvent(res, "Stripe account created", "STRIPE_CREATED", 60);
  if (role === "Employee") {
    const newWallet = new Wallet({
      moderator_id: newEmployee._id,
      stripeAccountId: account.id,
      balance: 0,
    });
    await newWallet.save();
    sendSseEvent(res, "Wallet created successfully", "WALLET_CREATED", 80);
  }

  const accountLink = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: "http://localhost:3000/reauth",
    return_url: "http://localhost:3000/dashboard",
    type: "account_onboarding",
  });
  sendSseEvent(res, "Stripe onboarding link generated", "DONE", 100);

  return accountLink.url;
}

async function getAllEmploye() {
  const employees = await User.find({ role: "Employee" }).sort({
    createdAt: -1,
  });

  return employees;
}

export default { createEmployee, getAllEmploye };
