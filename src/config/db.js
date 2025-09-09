import mongoose from "mongoose";
import logger from "./logger.js";
import dotenv from "dotenv";

dotenv.config();

const connectDB = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI not set");

  mongoose.set("strictQuery", false);
  await mongoose.connect(uri, { autoIndex: true });
  logger.info("MongoDB connected");
};

export default connectDB;
