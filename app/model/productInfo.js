'use strict';
module.exports = app => {
  const { TEXT, INTEGER } = app.Sequelize;

  const ProductInfo = app.model.define(
    'ProductInfo',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: INTEGER,
      },
      prices: {
        type: TEXT,
      },
      oldPrices: {
        type: TEXT,
      },
      scores: {
        type: TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  ProductInfo.associate = function() {
    app.model.ProductInfo.belongsTo(app.model.Product, { foreignKey: 'productId', targetKey: 'id' });
  };

  return ProductInfo;
};
