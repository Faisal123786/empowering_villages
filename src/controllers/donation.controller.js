// src/controllers/donation.controller.js

import * as donationService from "../services/donation.service.js";
import { successResponse } from "../utils/response.js";
import { addDonationJob } from "../jobs/donation.job.js";
  import mongoose from "mongoose";
/**
 * Create a new donation (Donor → Moderator/Area wallet)
 */
export const createDonation = async (req, res, next) => {
  try {
    const { amount, message } = req.body;
    const areaId = new mongoose.Types.ObjectId(req.body.areaId);
    const userId = new mongoose.Types.ObjectId('64f9b1c5a123456789abcdef');

    // const donation = await donationService.createDonation({ donorId, amount, message, areaId });
    await addDonationJob({ userId, areaId, amount, message });
    // return successResponse(res, "Donation created successfully", donation, 201);
  } catch (err) {
    next(err);
  }
};

/**
 * Get all donations for logged-in user (Donor/Moderator/Admin)
 */
export const getMyDonations = async (req, res, next) => {
  try {
    const donations = await donationService.getUserDonations(req.user);
    return successResponse(res, "Donations fetched successfully", donations);
  } catch (err) {
    next(err);
  }
};

/**
 * Get donations by area (Admin / Moderator)
 */
export const getDonationsByArea = async (req, res, next) => {
  try {
    const { areaId } = req.params;
    const donations = await donationService.getAreaDonations(areaId);
    return successResponse(res, "Area donations fetched successfully", donations);
  } catch (err) {
    next(err);
  }
};
