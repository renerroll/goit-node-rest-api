import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";
import dotenv from "dotenv";

dotenv.config();

const { SECRET_KEY } = process.env;

export const registerNewUser = async (req, res, next) => {
  try {
    const { email, password, subscription = "starter" } = req.body;

    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      throw HttpError(409, "Email in use");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await authService.registerUser(email, hashedPassword);

    return res.status(201).json({
      user: {
        email: newUser.email,
        subscription: newUser.subscription,
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