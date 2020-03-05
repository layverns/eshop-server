'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CarouselService extends Service {
  async getList() {
    const { ctx } = this;

    const carousels = await ctx.model.Carousel.findAll({ raw: true, attributes: ['id', 'image'] });

    return carousels;
  }
}

module.exports = CarouselService;
