/* eslint valid-jsdoc: "off" */

'use strict';
require('dotenv').config();
const path = require('path');

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = (exports = {});

  config.keys = appInfo.name + '_1582880581768_4433';

  config.middleware = ['error'];

  config.sequelize = {
    dialect: 'mysql',
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || '3306',
    database: 'eshop_dev',
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '12345678',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwtSecret = process.env.JWT_SECRET || 'happynewyear';

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH',
  };

  config.jwt = {
    secret: process.env.JWT_SECRET || 'happynewyear',
  };

  return {
    ...config,
  };
};
