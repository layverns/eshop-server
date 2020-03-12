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
  router.get('/api/categories/:id', controller.web.category.getDetail);

  router.get('/api/home/carousels', controller.web.carousel.getHomeList);
  router.get('/api/carousels', controller.web.carousel.getList);

  router.get('/api/products/:id', controller.web.product.getDetail);
  router.get('/api/products', controller.web.product.getList);
  router.get('/api/product/search', controller.web.product.search);

  router.post('/api/carts', app.jwt, controller.web.cart.create);
  router.get('/api/carts', app.jwt, controller.web.cart.getList);

  router.get('/api/new_products', controller.web.newProduct.getList);

  router.get('/api/recommend_products', controller.web.recommendProduct.getList);

  router.get('/api/best_sell_products', controller.web.bestSellProduct.getList);

  router.get('/api/time_products', controller.web.timeProduct.getList);

  router.get('/api/welfare_products', controller.web.welfareProduct.getList);

  router.get('/api/present_products', controller.web.presentProduct.getList);

  router.get('/api/lists/:id', controller.web.list.getDetail);
};
