'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'subcategory',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: INTEGER,
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
