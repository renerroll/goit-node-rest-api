import express from "express";
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
  resendVerify,
  verifyUser,
} from "../controllers/authControllers.js";

import { authSchema } from "../schemas/authSchemas.js";
import { varifySchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { upload } from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), registerNewUser);
authRouter.post("/login", validateBody(authSchema), loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/current", authMiddleware, getCurrentUser);
authRouter.patch(
  "/avatars",
  authMiddleware,
  upload.single("avatar"),
  updateAvatar
);
authRouter.get("/verify/:verificationToken", verifyUser);

authRouter.post("/verify", validateBody(varifySchema), resendVerify);

export default authRouter;