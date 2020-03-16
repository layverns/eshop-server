'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Product = app.model.define(
    'Product',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      thirdCategory: {
        type: STRING,
      },
      title: {
        type: STRING,
      },
      subtitle: {
        type: STRING,
      },
      images: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Product.associate = function() {
    app.model.Product.belongsTo(app.model.ThirdCategory, { foreignKey: 'thirdCategory', targetKey: 'id' });
    app.model.Product.hasOne(app.model.ProductInfo, { foreignKey: 'product', sourceKey: 'id' });
    app.model.Product.hasMany(app.model.ProductSpec, { foreignKey: 'product', sourceKey: 'id' });
    app.model.Product.belongsToMany(app.model.Tag, { through: app.model.ProductTag, foreignKey: 'product' });
  };

  return Product;
};
