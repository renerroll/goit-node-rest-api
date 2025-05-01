import { DataTypes } from 'sequelize';

import { sequelize } from '../Sequelize.js';

import { emailRegexp } from '../../constants/regexp.js';

const User = sequelize.define(
  'user',
  {
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: emailRegexp,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    subscription: {
      type: DataTypes.ENUM,
      values: ['starter', 'pro', 'business'],
      defaultValue: 'starter',
    },
    token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
  },
  {
    createdAt: false,
    updatedAt: false,
  }
);

export default User;
