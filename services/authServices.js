import User from "../models/User.js";

async function registerUser(email, password) {
  const user = await User.create({ email, password });
  console.log(`Created user with email ${email}:`, user);
  return user;
}

async function getUser(email) {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    console.log(`Found user with email ${email}:`, user);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function getUserById(userId) {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error(`User with ID ${userId} not found`);
    }
    console.log(`Found user with ID ${userId}:`, user);
    return user;
  } catch (error) {
    console.error(error.message);
    throw error;
  }
}

async function updateUserToken(userId, token) {
  const user = await User.update({ token }, { where: { id: userId } });
  return user;
}

async function updateUserAvatar(userId, avatarURL) {
  return await User.update({ avatarURL }, { where: { id: userId } });
}

export const resendVerificationEmail = async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw HttpError(400, "missing required field email");
    }

    const user = await User.findOne({ where: { email } });

    if (!user) {
      throw HttpError(404, "User not found");
    }

    if (user.verify) {
      throw HttpError(400, "Verification has already been passed");
    }

    const verificationToken = nanoid();
    await user.update({ verificationToken });

    const verificationLink = `${process.env.BASE_URL}/auth/verify/${verificationToken}`;
    await transporter.sendMail({
      to: email,
      subject: "Email Verification",
      html: `<p>Click <a href="${verificationLink}">here</a> to verify your email address.</p>`,
    });

    return res.status(200).json({
      message: "Verification email sent",
    });
  } catch (error) {
    next(error);
  }
};

export default {
  registerUser,
  getUser,
  getUserById,
  updateUserToken,
  updateUserAvatar,
};