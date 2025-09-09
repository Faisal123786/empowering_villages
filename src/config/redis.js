import IORedis from "ioredis";
import logger from "./logger.js";

const redisOptions = {
  maxRetriesPerRequest: null,
  // Add other options if needed, e.g. host, port, password
};

const client = new IORedis(process.env.REDIS_URL || "redis://127.0.0.1:6379", redisOptions);

client.on("connect", () => logger.info("Redis connected"));
client.on("error", (err) => logger.error({ err }, "Redis error"));

export default client;