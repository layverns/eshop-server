'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT, DECIMAL } = app.Sequelize;

  const Product = app.model.define(
    'Product',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      thirdCategoryId: {
        type: STRING,
      },
      title: {
        type: STRING,
      },
      subtitle: {
        type: STRING,
      },
      images: {
        type: TEXT,
      },
      details: {
        type: TEXT,
      },
      price: {
        type: DECIMAL(10, 2),
      },
      oldPrice: {
        type: DECIMAL(10, 2),
      },
    },
    {
      timestamps: true,
    }
  );

  Product.associate = function() {
    app.model.Product.belongsTo(app.model.ThirdCategory, { foreignKey: 'thirdCategoryId', targetKey: 'id' });
    app.model.Product.hasOne(app.model.ProductInfo, { foreignKey: 'productId', sourceKey: 'id' });
    app.model.Product.hasMany(app.model.ProductSpec, { foreignKey: 'productId', sourceKey: 'id' });
    app.model.Product.hasMany(app.model.Comment, { foreignKey: 'productId', sourceKey: 'id' });
    app.model.Product.belongsToMany(app.model.Tag, { through: app.model.ProductTag, foreignKey: 'productId' });
  };

  return Product;
};
