'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'Carousel',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
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
