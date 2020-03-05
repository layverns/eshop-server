'use strict';

const Controller = require('egg').Controller;

class CarouselController extends Controller {
  async getList() {
    const { ctx } = this;

    const carousels = await ctx.service.web.carousel.getList();

    ctx.body = {
      carousels,
    };
  }
}

module.exports = CarouselController;
