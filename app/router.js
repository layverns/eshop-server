'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/user', app.jwt, controller.web.user.get);
  router.post('/api/users/login', controller.web.user.login);
};
