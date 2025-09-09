// src/controllers/stats.controller.js

import * as donationService from "../services/donation.service.js";
import { successResponse } from "../utils/response.js";

/**
 * Get donation statistics for an area
 */
export const getAreaStats = async (req, res, next) => {
  try {
    const { areaId } = req.params;
    const stats = await donationService.getAreaStats(areaId);
    return successResponse(res, "Area stats fetched successfully", stats);
  } catch (err) {
    next(err);
  }
};

/**
 * Get global stats (Admin)
 */
export const getGlobalStats = async (req, res, next) => {
  try {
    const stats = await donationService.getGlobalStats();
    return successResponse(res, "Global stats fetched successfully", stats);
  } catch (err) {
    next(err);
  }
};
