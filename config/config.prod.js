/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  const config = (exports = {});

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    database: 'eshop',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '12345678',
  };

  return {
    ...config,
  };
};
