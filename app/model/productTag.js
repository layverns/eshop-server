'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'ProductTag',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      product: {
        type: INTEGER,
      },
      tag: {
        type: INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};
