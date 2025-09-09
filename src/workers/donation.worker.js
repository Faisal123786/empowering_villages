import { Worker } from "bullmq";
import redisConnection from "../config/redis.js";
import logger from "../config/logger.js";
import Donation from "../models/Donation.js";
import connectDB from "../config/db.js"; // import your DB connection

// Connect to MongoDB first
connectDB().then(() => {
  logger.info("Worker connected to MongoDB");

  const donationWorker = new Worker(
    "donation-queue",
    async (job) => {
      logger.info(`Processing donation job: ${job.id}`, job.data);

      const { userId, areaId, amount, message } = job.data;

      const donation = await Donation.create({ amount });

      logger.info(`Donation processed successfully: ${donation._id}`);
      return donation;
    },
    { connection: redisConnection }
  );

   donationWorker.on("completed", (job) => {
    logger.info(`Job ${job.id} completed successfully`);
  });

  donationWorker.on("failed", (job, err) => {
    logger.error(`Donation job failed: ${job.id}`, err);
  });

  logger.info("Donation worker started...");
});
