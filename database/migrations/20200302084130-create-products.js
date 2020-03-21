'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, DECIMAL } = Sequelize;

    return queryInterface.createTable('products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      third_category_id: {
        type: INTEGER,
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
      old_price: {
        type: DECIMAL(10, 2),
      },
      created_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updated_at: {
        allowNull: false,
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('products');
  },
};
