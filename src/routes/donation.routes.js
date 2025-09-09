import { Router } from "express";
import * as donationController from "../controllers/donation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

router.post("/", donationController.createDonation);
router.get("/me", authenticate, donationController.getMyDonations);
router.get("/area/:areaId", authenticate, donationController.getDonationsByArea);

export default router;
