'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CarouselService extends Service {
  async getHomeList() {
    const { ctx } = this;

    const carousels = await ctx.model.Carousel.findAll({ raw: true, where: { category: 0 }, attributes: ['id', 'image'] });

    return carousels;
  }
}

module.exports = CarouselService;
