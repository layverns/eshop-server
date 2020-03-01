'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  router.get('/api/user', app.jwt, controller.web.user.get);
  router.post('/api/users/login', controller.web.user.login);

  router.get('/api/notices', controller.web.notice.getList);
  router.get('/api/notices/:id', controller.web.notice.getDetail);

  router.get('/api/search/hot_words', controller.web.search.getHotWords);

  router.get('/api/categories', controller.web.category.getList);
};
