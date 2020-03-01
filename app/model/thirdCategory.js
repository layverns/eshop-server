'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'thirdCategory',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subcategory: {
        type: INTEGER,
      },
      title: {
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
};
