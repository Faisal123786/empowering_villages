import pino from "pino";
import dotenv from "dotenv";

dotenv.config();

let logger;

if (process.env.NODE_ENV === "development") {
  const transport = pino.transport({
    target: "pino-pretty",
    options: {
      colorize: true, 
      translateTime: "SYS:standard",
      ignore: "pid,hostname", 
    },
  });

  logger = pino({ level: process.env.LOG_LEVEL || "info" }, transport);
} else {
  logger = pino({ level: process.env.LOG_LEVEL || "info" });
}

export default logger;
