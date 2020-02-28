/* eslint valid-jsdoc: "off" */

'use strict';

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
    host: '127.0.0.1',
    port: 3306,
    database: 'eshop_dev',
    username: 'root',
    password: '12345678',
  };

  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.jwtSecret = 'hhhhaaa';

  return {
    ...config,
  };
};
