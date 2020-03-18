'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, TEXT, literal } = Sequelize;

    return queryInterface.createTable('comments', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      product_id: {
        type: INTEGER,
      },
      user_id: {
        type: INTEGER,
      },
      specs: {
        type: STRING,
      },
      stars: {
        type: INTEGER,
      },
      text: {
        type: TEXT,
      },
      images: {
        type: TEXT,
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
    return queryInterface.dropTable('comments');
  },
};
