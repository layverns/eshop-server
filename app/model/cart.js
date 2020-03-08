'use strict';
module.exports = app => {
  const { TEXT, INTEGER } = app.Sequelize;

  const Cart = app.model.define(
    'Cart',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: INTEGER,
      },
      product: {
        type: INTEGER,
      },
      quantity: {
        type: INTEGER,
      },
      specs: {
        type: TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  Cart.associate = function() {
    app.model.Cart.belongsTo(app.model.User, { foreignKey: 'product', targetKey: 'id' });
    // app.model.Cart.hasOne(app.model.Product);
  };

  return Cart;
};
