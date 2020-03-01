'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { INTEGER, STRING } = Sequelize;

    return queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: INTEGER,
      },
      username: {
        type: STRING,
      },
      email: {
        type: STRING,
        unique: true,
      },
      password: {
        type: STRING,
      },
      image: {
        type: STRING,
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
    return queryInterface.dropTable('users');
  },
};
