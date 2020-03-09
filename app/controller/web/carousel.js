'use strict';

const Controller = require('egg').Controller;

class CarouselController extends Controller {
  async getHomeList() {
    const { ctx } = this;

    const carousels = await ctx.service.web.carousel.getHomeList();

    ctx.body = {
      carousels,
    };
  }
}

module.exports = CarouselController;
