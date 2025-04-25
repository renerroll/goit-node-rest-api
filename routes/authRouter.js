import express from "express";
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  updateAvatar,
} from "../controllers/authControllers.js";

import { authSchema } from "../schemas/authSchemas.js";
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

export default authRouter;