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
      userId: {
        type: INTEGER,
      },
      productId: {
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
    app.model.Cart.belongsTo(app.model.User, { foreignKey: 'userId', targetKey: 'id' });
  };

  return Cart;
};
