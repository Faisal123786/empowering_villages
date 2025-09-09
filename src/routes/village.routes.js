import { Router } from "express";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { validateRequest, villageSchemas } from "../utils/validator.js";
import * as villageController from "../controllers/village.controller.js";
import multer from "multer";

const router = Router();
const upload = multer({ dest: "../client/empowering-villages/public/uploads" });

router.post(
  "/add-new-village",
  validateRequest(villageSchemas.create),
  authenticate,
  authorize("Admin"),
  upload.single("image"),
  villageController.register
);

router.get(
  "/getAll",
  authenticate,
  authorize("Admin"),
  villageController.getAllVillages
);

router.get(
  "/village-detail/:id",
  validateRequest(villageSchemas.getById),
  authenticate,
  authorize("Admin"),
  villageController.getVillageDetail
);


router.get(
  "/unassigned",
  authenticate,
  authorize("Admin"),
  villageController.getAllVillagesWithoutemployee
);


export default router;
