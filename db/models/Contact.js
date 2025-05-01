import { DataTypes } from "sequelize";

import sequelize from "../Sequelize.js";
import {emailRegexp} from "../../constants/auth.js";

const Contact = sequelize.define(
    'Contact', {
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                is: emailRegexp,
            },
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        favorite: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        owner: {
            type: DataTypes.INTEGER,
            allowNull: false,
        }
    },
);

export default Contact;