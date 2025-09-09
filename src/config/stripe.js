import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET, {
  // apiVersion: "2024-11-15",
});
export default stripe;
