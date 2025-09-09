import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateRequest, employeeSchemas } from "../utils/validator.js";
import * as employeeController from "../controllers/employee.controller.js";
import * as employeeProgress from "../controllers/sse.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "../client/empowering-villages/public/uploads" });

router.post(
  "/add-new-employee",
  validateRequest(employeeSchemas.create),
  authenticate,
  authorize("Admin"),
  upload.single("image"),
  employeeController.createEmployee
);

router.get(
  "/getAllEmployee",
  authenticate,
  authorize("Admin"),
  employeeController.getAllEmployee
);

router.get(
  "/employee-progress",
  employeeProgress.employeeProgress
);



export default router;
