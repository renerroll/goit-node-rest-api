import User from "../models/contactsUser.js";

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

export default {
  registerUser,
  getUser,
  getUserById,
  updateUserToken,
  updateUserAvatar,
};