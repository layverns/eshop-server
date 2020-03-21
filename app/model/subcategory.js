'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Subcategory = app.model.define(
    'Subcategory',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      categoryId: {
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

  Subcategory.associate = function() {
    app.model.Subcategory.belongsTo(app.model.Category, { foreignKey: 'categoryId', targetKey: 'id', as: 'category' });
  };

  return Subcategory;
};
