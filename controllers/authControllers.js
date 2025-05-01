import errorWrapper from "../helpers/errorWrapper.js";
import authService from "../services/authServices.js";
import HttpError from "../helpers/HttpError.js";

const register = async (req, res) => {
    const newUser = await authService.register(req.body);

    res.status(201).send({
      user: {
          email: newUser.email,
          subscription: newUser.subscription,
          avatar: newUser.avatar,
      }
    })
}

const login = async (req, res) => {
    const user = await authService.login(req.body);

    res.status(200).send({
        token: user.token,
        user: {
            email: user.email,
            subscription: user.subscription,
        }
    })
}

const logout = async (req, res) => {
    await authService.logout(req.user.id);

    res.status(204).send();
};

const getCurrentUser = async (req, res) => {
    const user = req.user;

    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    res.status(200).json({
        email: user.email,
        subscription: user.subscription,
    });
};

const updateAvatar = async (req, res) => {
    const user = req.user;

    if (!user) {
        throw HttpError(401, "Not authorized");
    }

    const updatedUser = await authService.updateAvatar(req.user.id, req.file);

    if (!updatedUser) throw HttpError(404, "Not found");

    res.status(200).json({
        avatarURL: updatedUser.avatarURL,
    })
}

const verificationToken = async (req, res) => {
    const user = await authService.verificationToken(req.params.verificationToken);

    if (!user) throw HttpError(404, "Not found");

    res.status(200).send({
        message: 'Verification successful',
    })
}

const verify = async (req, res) => {
    const user = await authService.verify(req.body.email);

    if (!user) throw HttpError(400, "Verification has already been passed");

    res.status(200).send({
        message: 'Verification email sent',
    })
}

export default {
    register: errorWrapper(register),
    login: errorWrapper(login),
    logout: errorWrapper(logout),
    getCurrentUser: errorWrapper(getCurrentUser),
    updateAvatar: errorWrapper(updateAvatar),
    verificationToken: errorWrapper(verificationToken),
    verify: errorWrapper(verify),
};