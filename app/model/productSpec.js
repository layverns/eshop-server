'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const ProductSpec = app.model.define(
    'ProductSpec',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: INTEGER,
      },
      spec: {
        type: STRING,
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

  ProductSpec.associate = function() {
    app.model.ProductSpec.belongsTo(app.model.Product, { foreignKey: 'productId', targetKey: 'id' });
  };

  return ProductSpec;
};
