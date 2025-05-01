import express from "express";

import authController from "../controllers/authControllers.js";
import validateBody from "../helpers/validateBody.js";
import {createUserSchema, getUserSchema, verifyEmailSchema} from "../schemas/authSchema.js";

import auth from "../middlewares/auth.js";
import upload from "../middlewares/upload.js";

const authRouter = express.Router();

authRouter.post(
    "/register",
    validateBody(createUserSchema),
    authController.register,
);

authRouter.post(
    "/login",
    validateBody(getUserSchema),
    authController.login,
);

authRouter.post("/logout", auth, authController.logout);

authRouter.get("/current", auth, authController.getCurrentUser);

authRouter.patch("/avatars", upload.single("avatar"), auth, authController.updateAvatar);

authRouter.get("/verify/:verificationToken", authController.verificationToken)

authRouter.post("/verify", validateBody(verifyEmailSchema), authController.verify)

export default authRouter;