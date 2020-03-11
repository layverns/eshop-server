'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CarouselService extends Service {
  async getHomeList() {
    const { ctx } = this;

    const carousels = await ctx.model.Carousel.findAll({ raw: true, where: { category: 0 }, attributes: ['id', 'image'] });

    return carousels;
  }

  async getList({ categoryId }) {
    const { ctx } = this;

    let carousels = [];
    if (_.isEmpty(categoryId)) {
      carousels = await ctx.model.Carousel.findAll({ raw: true, attributes: ['id', 'image'] });
    } else {
      carousels = await ctx.model.Carousel.findAll({ raw: true, where: { category: categoryId }, attributes: ['id', 'image'] });
    }

    return carousels;
  }
}

module.exports = CarouselService;
