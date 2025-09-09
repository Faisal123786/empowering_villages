import { Router } from "express";
import authRoutes from "./auth.routes.js";
import donationRoutes from "./donation.routes.js";
import villageRoutes from "./village.routes.js";
import employeeRoutes from "./employee.routes.js";
import webhookRoutes from "./webhook.routes.js";

const router = Router();

router.use("/auth", authRoutes);
router.use("/donations", donationRoutes);
router.use("/village", villageRoutes);
router.use("/employee", employeeRoutes);
router.use("/webhook", webhookRoutes);

export default router;
