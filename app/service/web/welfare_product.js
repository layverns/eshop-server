'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class WelfareProductService extends Service {
  async getList({ limit, offset }) {
    const { ctx } = this;

    let welfareProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
      offset,
      limit,
    });

    if (_.isEmpty(welfareProducts)) {
      return [];
    }

    welfareProducts = await Promise.all(
      welfareProducts.map(async p => {
        let info = await ctx.model.ProductInfo.findOne({
          raw: true,
          where: {
            product: p.id,
          },
        });
        let price = getFirstNum(JSON.parse(info.prices));
        let oldPrice = getFirstNum(JSON.parse(info.oldPrices));

        return {
          ...p,
          price,
          oldPrice,
          images: JSON.parse(p.images),
        };
      })
    );

    return welfareProducts;
  }
}

module.exports = WelfareProductService;
