import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";
import {emailRegexp} from "../../constants/auth.js";

const User = sequelize.define(
    "User",
    {
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                is: emailRegexp,
            },
        },
        subscription: {
            type: DataTypes.ENUM,
            values: ["starter", "pro", "business"],
            defaultValue: "starter"
        },
        avatarURL: DataTypes.STRING,
        token: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    },
);

export default User;