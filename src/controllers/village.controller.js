import villageService from "../services/village.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const register = async (req, res) => {
  try {
    const { name, location, nearerCity, district, tehsil, postalCode } =
      req.body;
    const image = req.file?.filename || null;

    const village = await villageService.createVillage({
      name,
      location,
      nearerCity,
      district,
      tehsil,
      postalCode,
      image,
    });
    if (!village) return errorResponse(res, "Village registration failed", 400);

    return successResponse(res, "Village registered successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getAllVillages = async (req, res) => {
  try {
    const v = await villageService.getAllVillages();

    return successResponse(res, v, "All villages fetched successfully!", 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};


export const getAllVillagesWithoutemployee = async (req, res) => {
  try {
    const unAssignedVillages = await villageService.getAllUnAssignedVillages();

    return successResponse(res, unAssignedVillages, "All villages fetched successfully!", 200);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};

export const getVillageDetail = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return errorResponse(res, "Village Id Is Required", 400);
    }
    const {userWallet,users,area}  = await villageService.getVillageDetail(id);
    return successResponse(res, {area,user:users || [], wallet:userWallet}, "Village and user details fetched successfully", 201);
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
