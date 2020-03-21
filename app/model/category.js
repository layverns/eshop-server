'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Category = app.model.define(
    'Category',
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

  Category.associate = function() {};

  return Category;
};
