'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Order = app.model.define(
    'Order',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      no: {
        type: STRING,
      },
      userId: {
        type: INTEGER,
      },
      status: {
        type: INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );

  Order.associate = function() {
    app.model.Order.hasMany(app.model.OrderItem, { foreignKey: 'orderId', sourceKey: 'id' });
  };

  return Order;
};
