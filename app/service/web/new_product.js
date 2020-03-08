'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class NewProductService extends Service {
  async getList() {
    const { ctx } = this;

    let newProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['created_at', 'DESC']],
    });

    if (_.isEmpty(newProducts)) {
      return [];
    }

    newProducts = await Promise.all(
      newProducts.map(async p => {
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
        let old_price = getFirstNum(JSON.parse(info.old_prices));
        return {
          ...p,
          price,
          old_price,
          images: JSON.parse(p.images),
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return newProducts;
  }
}

module.exports = NewProductService;
