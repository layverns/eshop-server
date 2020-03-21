'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const {} = require('../../libs/utils');

class TimeProductService extends Service {
  async getList(where, { limit, offset }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let timeProducts = await ctx.model.Product.findAll({
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

    if (_.isEmpty(timeProducts)) {
      return [];
    }

    timeProducts = await Promise.all(
      timeProducts.map(async p => {
        return {
          ...p,
          quantity: 240,
          remain: Math.floor(Math.random() * 240),
        };
      })
    );

    return timeProducts;
  }
}

module.exports = TimeProductService;
