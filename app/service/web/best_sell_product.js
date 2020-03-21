'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class BestSellProductService extends Service {
  async getList({ limit, offset }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let bestSellProducts = await ctx.model.Product.findAll({
      raw: true,
      order: [['price', 'DESC']],
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

        return {
          ...p,
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return bestSellProducts;
  }
}

module.exports = BestSellProductService;
