import User from "../models/User.js";
import {
  hashPassword,
  comparePassword,
  generateToken,
} from "../utils/crypto.js";

async function createUser({ name, email, password, role }) {
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    throw new Error("User already exists");
  }
  const passwordHash = password ? await hashPassword(password) : undefined;
  const u = new User({ name, email, password: passwordHash, role });
  await u.save();
  return u;
}

async function loginUser({ email, password, role }) {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User Not Found");
  if (role && user.role !== role)
    throw new Error("Invalid Role");
  if (user.active_account === false)
   throw new Error("Account Not Activated");

  const isValid = await comparePassword(user.password, password);
  if (!isValid) throw new Error("Invalid Password");

  const token = generateToken({
    id: user?._id,
    name: user?.name,
    role: user?.role,
    email: user?.email,
    ...(user?.area_id && { area_id: user?.area_id }),
  });
  return { token, user };
}

async function activateUser(email) {
  const user = await User.findOneAndUpdate(
    { email },
    { active_account: true },
    { new: true }
  );
  return user;
}

async function logoutUser(res) {
  res.clearCookie("token", {
    httpOnly: true,
    secure: false,
  });
  return true;
}

export default { createUser, loginUser, activateUser, logoutUser };
