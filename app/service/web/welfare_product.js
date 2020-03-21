'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class WelfareProductService extends Service {
  async getList({}, { limit, offset }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let welfareProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
      offset,
      limit,
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
          [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
          [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
        ],
      },
    });

    return welfareProducts;
  }
}

module.exports = WelfareProductService;
