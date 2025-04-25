import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/contactsUser.js";
import authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";
import gravatar from "gravatar";
import path from "node:path";
import fs from "node:fs/promises";
import { Jimp } from "jimp";

dotenv.config();
const { SECRET_KEY } = process.env;

const avatarsDir = path.resolve("public/avatars");

export const registerNewUser = async (req, res, next) => {
  try {
    const { email, password, subscription = "starter" } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const avatarURL = await gravatar.url(email, { s: "250", d: "retro" }, true);
    const newUser = await authService.registerUser(
      email,
      hashedPassword,
      avatarURL
    );

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
        avatarURL: newUser.avatarURL,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await authService.getUser(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw HttpError(401, "Email or password is wrong");
    }

    const payload = { id: user.id };
    const token = jwt.sign(payload, SECRET_KEY, { expiresIn: "1h" });

    const result = await authService.updateUserToken(user.id, token);

    return res.status(200).json({
      token,
      user: {
        email: user.email,
        subscription: user.subscription,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = async (req, res, next) => {
  try {
    const { id } = req.user;

    const user = await authService.getUserById(id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    await authService.updateUserToken(id, null);

    return res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getCurrentUser = async (req, res, next) => {
  try {
    const { id, email, subscription } = req.user;
    const user = await authService.getUserById(id);

    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    return res.status(200).json({ email, subscription });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res) => {
  if (!req.file) {
    throw HttpError(400, "No file uploaded");
  }

  const { path: tempPath, filename } = req.file;
  const avatarName = `${req.user.id}-${Date.now()}${path.extname(filename)}`;
  const avatarPath = path.join(avatarsDir, avatarName);

  await fs.rename(tempPath, avatarPath);
  const avatarURL = `/avatars/${avatarName}`;
  await authService.updateUserAvatar(req.user.id, avatarURL);

  res.json({ avatarURL });
};