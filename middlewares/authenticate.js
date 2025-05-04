import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { User } from "../models/user.js";
import HttpError from "../helpers/HttpError.js";

dotenv.config();

const { JWT_SECRET = "default_secret" } = process.env;

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || "";

    const [bearer, token] = authHeader.split(" ");

    if (bearer !== "Bearer" || !token) {
      throw HttpError(401, "Not authorized");
    }

    let payload;
    try {
      payload = jwt.verify(token, JWT_SECRET);
    } catch {
      throw HttpError(401, "Not authorized");
    }

    const user = await User.findByPk(payload.id);

    if (!user || user.token !== token) {
      throw HttpError(401, "Not authorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};

export default authenticate;
