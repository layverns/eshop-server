'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class BestSellProductService extends Service {
  async getList({ limit, offset }) {
    const { ctx } = this;

    let bestSellProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['id', 'DESC']],
      offset,
      limit,
    });

    if (_.isEmpty(bestSellProducts)) {
      return [];
    }

    bestSellProducts = await Promise.all(
      bestSellProducts.map(async p => {
        let tags = await ctx.model.Tag.findAll({
          raw: true,
          include: [
            {
              model: ctx.model.Product,
              where: {
                id: p.id,
              },
              attributes: [],
            },
          ],
          attributes: ['id', 'title', 'color'],
        });

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
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return bestSellProducts;
  }
}

module.exports = BestSellProductService;
