import express from "express";
import {
  registerNewUser,
  loginUser,
  logoutUser,
  getCurrentUser,
} from "../controllers/authControllers.js";

import { authSchema } from "../schemas/authSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const authRouter = express.Router();

authRouter.post("/register", validateBody(authSchema), registerNewUser);
authRouter.post("/login", validateBody(authSchema), loginUser);
authRouter.post("/logout", authMiddleware, logoutUser);
authRouter.get("/current", authMiddleware, getCurrentUser);

export default authRouter;