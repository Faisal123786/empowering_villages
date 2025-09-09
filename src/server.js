// server.js (entry point)
import http from "http";
import cluster from "cluster";
import os from "os";
import app from "./app.js";
import connectDB from "./config/db.js";
import logger from "./config/logger.js";

const PORT = process.env.PORT || 5000;

// 🚀 Development / local (with cluster)
if (process.env.NODE_ENV !== "production") {
  const numCPUs = os.cpus().length;

  if (cluster.isPrimary) {
    logger.info(`Master process started with PID ${process.pid}`);
    for (let i = 0; i < numCPUs; i++) {
      cluster.fork();
    }
    cluster.on("exit", (worker) => {
      logger.warn(`Worker ${worker.process.pid} died. Restarting...`);
      cluster.fork();
    });
  } else {
    const server = http.createServer(app);
    connectDB().then(() => {
      server.listen(PORT, () => {
        logger.info(`Worker ${process.pid} running on port ${PORT}`);
      });
    });
  }
} else {
  // 🚀 Production (Vercel, serverless, or single instance server)
  connectDB()
    .then(() => logger.info("Database connected in production"))
    .catch((err) => logger.error("Database connection failed", err));

  // export default app; // 👈 required for Vercel / serverless
}
