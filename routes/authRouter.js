import express from "express";
import validateBody from "../helpers/validateBody.js";
import {
  registerSchema,
  resendVerifyEmailSchema,
  loginSchema,
} from "../schemas/authSchemas.js";
import { updateSubscriptionSchema } from "../schemas/userSchemas.js";
import {
  register,
  verifyEmail,
  resendVerifyEmail,
  login,
  getCurrent,
  logout,
} from "../controllers/authControllers.js";
import {
  updateSubscription,
  updateAvatar,
} from "../controllers/userControllers.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(registerSchema), register);

authRouter.get("/verify/:verificationToken", verifyEmail);

authRouter.post(
  "/verify",
  validateBody(resendVerifyEmailSchema),
  resendVerifyEmail
);

authRouter.post("/login", validateBody(loginSchema), login);

authRouter.get("/current", authenticate, getCurrent);

authRouter.patch(
  "/subscription",
  authenticate,
  validateBody(updateSubscriptionSchema),
  updateSubscription
);

authRouter.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  updateAvatar
);

authRouter.post("/logout", authenticate, logout);

export default authRouter;
