'use strict';
module.exports = app => {
  const { TEXT, INTEGER, BOOLEAN } = app.Sequelize;

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
      isChecked: {
        type: BOOLEAN,
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
  };

  return Cart;
};
