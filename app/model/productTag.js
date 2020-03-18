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
      productId: {
        type: INTEGER,
      },
      tagId: {
        type: INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
};
