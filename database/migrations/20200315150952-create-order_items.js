'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, literal, DECIMAL } = Sequelize;

    return queryInterface.createTable('order_items', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      product_id: {
        type: INTEGER,
      },
      image: {
        type: STRING,
      },
      title: {
        type: STRING,
      },
      specs: {
        type: STRING,
      },
      price: {
        type: DECIMAL(10, 2),
      },
      old_price: {
        type: DECIMAL(10, 2),
      },
      quantity: {
        type: INTEGER,
      },
      order_id: {
        type: INTEGER,
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('order_items');
  },
};
