import { Router } from "express";
import * as authController from "../controllers/auth.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";
import { validateRequest,authSchemas } from "../utils/validator.js";

const router = Router();

router.post("/register",validateRequest(authSchemas.register), authController.register);
router.post("/login", validateRequest(authSchemas.login),authController.login);
router.get('/activate/:id', authController.activateAccount);
router.post('/logout',authenticate, authController.logout);

export default router;
