// src/jobs/donation.job.js
import { Queue } from "bullmq";
import  redisConnection  from "../config/redis.js";

export const donationQueue = new Queue("donation-queue", {
  connection: redisConnection,
});


// Add a donation job
export const addDonationJob = async (donationData) => {
  const job = await donationQueue.add("process-donation", donationData, {
    attempts: 3, // retry failed jobs up to 3 times
    backoff: {
      type: "exponential",
      delay: 5000,
    },
    removeOnComplete: true,
    removeOnFail: true,
    delay: 20000
  });
   const counts = await donationQueue.getJobCounts();
  console.log("Updated Queue Status:", counts);
};


