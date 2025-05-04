import path from "path";
import fs from "fs/promises";
import HttpError from "../helpers/HttpError.js";
import { User } from "../models/user.js";

const avatarsDir = path.resolve("public", "avatars");

export const updateSubscription = async (req, res, next) => {
  try {
    const { id } = req.user;
    const { subscription } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      throw HttpError(401, "Not authorized");
    }

    user.subscription = subscription;
    await user.save();

    res.status(200).json({
      email: user.email,
      subscription: user.subscription,
    });
  } catch (error) {
    next(error);
  }
};

export const updateAvatar = async (req, res, next) => {
  try {
    if (!req.file) {
      throw HttpError(400, "No file uploaded");
    }

    const { path: tempPath, originalname } = req.file;
    const { id } = req.user;

    const ext = path.extname(originalname);
    const newFileName = `user_${id}_${Date.now()}${ext}`;
    const finalPath = path.join(avatarsDir, newFileName);

    await fs.rename(tempPath, finalPath);

    const avatarURL = `/avatars/${newFileName}`;

    await User.update({ avatarURL }, { where: { id } });

    res.status(200).json({ avatarURL });
  } catch (error) {
    next(error);
  }
};
