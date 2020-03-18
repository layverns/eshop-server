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

  Category.associate = function() {
    app.model.Category.hasMany(app.model.Subcategory, { foreignKey: 'categoryId', sourceKey: 'id' });
  };

  return Category;
};
