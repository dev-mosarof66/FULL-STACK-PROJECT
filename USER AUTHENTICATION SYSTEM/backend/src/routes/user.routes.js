import { Router } from "express";
import {
  userController,
  userProfileController,
} from "../controllers/userController.controllers.js";
import verifyToken from "../middlewares/auth.middlewares.js";
const router = Router();

router.route("/login").get(userController);

router.route("/profile").get(verifyToken, userProfileController);

export default router;
