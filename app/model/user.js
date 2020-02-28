'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'user',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: STRING,
        defaultValue: '',
      },
      email: {
        type: STRING,
        defaultValue: '',
      },
      password: {
        type: STRING,
        defaultValue: '',
      },
      image: {
        type: STRING,
        defaultValue: '',
      },
    },
    {
      timestamps: true,
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    }
  );
};
