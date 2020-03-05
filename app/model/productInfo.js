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
      product: {
        type: INTEGER,
      },
      prices: {
        type: TEXT,
      },
      old_prices: {
        type: TEXT,
      },
      score: {
        type: TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  ProductInfo.associate = function() {
    app.model.ProductInfo.belongsTo(app.model.Product, { foreignKey: 'product', targetKey: 'id' });
  };

  return ProductInfo;
};
