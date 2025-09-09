import express from "express";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import routes from "./routes/index.js";
import { errorHandler } from "./middlewares/error.middleware.js";
import rateLimiter from "./middlewares/rateLimiter.js";
import prometheus from "./monitoring/prometheus.js";
import "./monitoring/sentry.js";
import "./monitoring/opentelemetry.js";

const app = express();

app.use("/api/webhook", bodyParser.raw({ type: "application/json" }));

app.use(bodyParser.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(helmet());
app.use(cors());
app.use(morgan("dev"));

app.use(rateLimiter);

app.use("/api", routes);

app.get("/metrics", async (req, res) => {
  res.set("Content-Type", prometheus.register.contentType);
  res.end(await prometheus.register.metrics());
});

app.use(errorHandler);

export default app;
