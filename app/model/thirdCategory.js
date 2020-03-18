'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const ThirdCategory = app.model.define(
    'ThirdCategory',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      subcategoryId: {
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

  ThirdCategory.associate = function() {
    app.model.ThirdCategory.belongsTo(app.model.Subcategory, { foreignKey: 'subcategoryId', targetKey: 'id' });
    app.model.ThirdCategory.hasMany(app.model.Product, { foreignKey: 'thirdCategoryId', sourceKey: 'id' });
  };

  return ThirdCategory;
};
