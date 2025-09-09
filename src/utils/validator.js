import Joi from "joi";
import ApiError from "./ApiError.js";

export const validateRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, { abortEarly: false });

    if (error) {
      const details = error.details.map((err) => err.message.replace(/['"]+/g, ""));
      return next(new ApiError(400, details.join(", ")));
    }
    next();
  };
};


export const authSchemas = {
  register: Joi.object({
    name: Joi.string().min(3).max(50).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    role: Joi.string().valid("Admin", "Employee", "Donor", "Accepter").required(),
  }),

  login: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
};

export const villageSchemas = {
  create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    location: Joi.string().min(3).max(200).required(),
    nearerCity: Joi.string().min(2).max(100).required(),
    district: Joi.string().min(2).max(100).required(),
    tehsil: Joi.string().min(2).max(100).required(),
    postalCode: Joi.number().integer().required(),
    image: Joi.string().uri().optional().allow(""),
    employee_id: Joi.string().hex().length(24).optional().allow(null, ""),
  }),
  getById: Joi.object({
    id: Joi.string().hex().length(24).required(),
  }),
};

export const employeeSchemas = {
 create: Joi.object({
    name: Joi.string().min(3).max(100).required(),
    email: Joi.string().email().required(),
    phone: Joi.string().pattern(/^\d{10,15}$/).required(),
    address: Joi.string().min(3).max(200).required(),
    cnic: Joi.string().pattern(/^\d{13}$/).required(),
    houseNo: Joi.string().min(1).max(50).required(),
    photo: Joi.string().optional().allow(""),
    role: Joi.string().valid("Employee").default("Donor"),
    password: Joi.string().min(6).required(),
    active_account: Joi.boolean().optional(),
    area_id: Joi.string().hex().length(24).required(),
 })
  
};