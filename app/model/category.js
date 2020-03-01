'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'category',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );
};
