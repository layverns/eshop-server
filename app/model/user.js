'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const User = app.model.define(
    'User',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
      },
      email: {
        type: STRING,
      },
      password: {
        type: STRING,
      },
      image: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  User.associate = function() {};

  return User;
};
