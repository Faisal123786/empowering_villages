import employeeService from "../services/employee.service.js";
import { successResponse, errorResponse } from "../utils/response.js";

export const createEmployee = async (req, res) => {
  try {
    const { name, email, password, role, area } = req.body;
    const redirectUrl = await employeeService.createEmployee(res, {
      name,
      email,
      password,
      role,
      area,
    });

    return successResponse(
      res,
      {url: redirectUrl},
      "User registered successfully",
      201
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};


export const getAllEmployee = async (req, res) => {
  try {
    const e = await employeeService.getAllEmploye();

    return successResponse(
      res,
      e,
      "All Employees fetched successfully!",
      200
    );
  } catch (err) {
    return errorResponse(res, err.message, 400);
  }
};
