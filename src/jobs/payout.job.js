// src/jobs/payout.job.js
import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

export const payoutQueue = new Queue("payout-queue", {
  connection: redisConnection,
});

// Add payout job
export const addPayoutJob = async (payoutData) => {
  await payoutQueue.add("process-payout", payoutData, {
    attempts: 5,
    backoff: {
      type: "fixed",
      delay: 10000,
    },
  });
};
