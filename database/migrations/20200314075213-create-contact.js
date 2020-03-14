'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    const { INTEGER, STRING, BOOLEAN } = Sequelize;

    return queryInterface.createTable('contacts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      user: {
        type: INTEGER,
      },
      province: {
        type: STRING,
      },
      city: {
        type: STRING,
      },
      district: {
        type: STRING,
      },
      address: {
        type: STRING,
      },
      person: {
        type: STRING,
      },
      phone: {
        type: STRING,
      },
      default: {
        type: BOOLEAN,
        defaultValue: false,
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
    return queryInterface.dropTable('contacts');
  },
};
