'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class PresentProductService extends Service {
  async getList(where, { limit, offset }) {
    const { ctx } = this;

    let presentProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (_.isEmpty(presentProducts)) {
      return [];
    }

    presentProducts = await Promise.all(
      presentProducts.map(async p => {
        let info = await ctx.model.ProductInfo.findOne({
          raw: true,
          where: {
            productId: p.id,
          },
        });
        let price = getFirstNum(JSON.parse(info.prices));

        return {
          ...p,
          price,
          images: JSON.parse(p.images),
        };
      })
    );

    return presentProducts;
  }
}

module.exports = PresentProductService;
