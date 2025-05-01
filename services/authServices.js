import { UniqueConstraintError } from "sequelize";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import gravatar from "gravatar";
import * as path from "node:path";
import * as fs from "node:fs/promises";
import { v4 as uuidv4 } from 'uuid';

import User from "../db/models/User.js";
import HttpError from "../helpers/HttpError.js";
import emailService from "./emailService.js";


const avatarsDir = path.join("public", "avatars");

const register = async ({ email, password }) => {
    try {
        const hashPassword = bcrypt.hashSync(password, 10);
        const avatarURL = gravatar.url(email, { protocol: 'https' });
        const verificationToken = uuidv4();

        const newUser = await User.create({
            email,
            password: hashPassword,
            avatarURL: avatarURL,
            subscription: "starter",
            verificationToken,
        });

        await emailService.sendVerificationEmail(email, verificationToken);

        return newUser;
    } catch (error) {
        if (error instanceof UniqueConstraintError) {
            throw HttpError(409, "Email in use")
        }

        throw error;
    }
};

const login = async ({ email, password }) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw HttpError(401, "Email or password is wrong");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw HttpError(401, "Email or password is wrong");
    }

    if (!user.verify) {
        throw HttpError(401, "Email isn't verified");
    }

    const payload = {
        id: user.id,
        email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1h" });
    user.token = token;

    await user.save();

    return {
        email: user.email,
        subscription: user.subscription,
        token,
    };
};

const logout = async (userId) => {
    const user = await User.findByPk(userId);

    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    user.token = null;
    await user.save();
};

const updateAvatar = async (userId, file) => {
    if (!file) {
        throw HttpError(400, "Field 'avatar' is required");
    }

    const { path: oldPath, filename } = file;
    const newPath = path.join(avatarsDir, filename);

    await fs.rename(oldPath, newPath);
    const avatarURL = path.join("avatars", filename);

    const user = await User.findOne({ where: { id: userId } });

    if (!user) return null;

    return user.update(
        { avatarURL: `${process.env.HOST}:${process.env.PORT}/${avatarURL}` },
        { returning: true }
    );
}

const verificationToken = async (verificationToken) => {
    if (!verificationToken) return null;

    const user = await User.findOne({
        where: { verificationToken: verificationToken }
    });

    if (!user) return null;

    return user.update({ verificationToken: null, verify: true }, { returning: true });
}

const verify = async (email) => {
    const user = await User.findOne({ where: { email } });

    if (!user) {
        throw HttpError(401, "User with current email does not exist");
    }

    if (user.verify) return null;

    await emailService.sendVerificationEmail(email, user.verificationToken);

    return user;
}

export default {
    register,
    login,
    logout,
    updateAvatar,
    verificationToken,
    verify,
};