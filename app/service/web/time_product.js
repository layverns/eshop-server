'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class TimeProductService extends Service {
  async getList({ limit, offset }) {
    const { ctx } = this;

    let timeProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (_.isEmpty(timeProducts)) {
      return [];
    }

    timeProducts = await Promise.all(
      timeProducts.map(async p => {
        let info = await ctx.model.ProductInfo.findOne({
          raw: true,
          where: {
            product: p.id,
          },
        });
        let price = getFirstNum(JSON.parse(info.prices));
        let old_price = getFirstNum(JSON.parse(info.old_prices));

        return {
          ...p,
          price,
          old_price,
          quantity: 240,
          remain: Math.floor(Math.random() * 240),
          images: JSON.parse(p.images),
        };
      })
    );

    return timeProducts;
  }
}

module.exports = TimeProductService;
