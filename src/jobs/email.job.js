// src/jobs/email.job.js
import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const emailQueue = new Queue("email-queue", {
  connection: redisConnection,
});

// Add email job
export const addEmailJob = async (emailData) => {
  await emailQueue.add("send-email", emailData, {
    attempts: 2,
    removeOnComplete: true,
  });
};
