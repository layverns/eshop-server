'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class RecommendProductService extends Service {
  async getList(where, { limit, offset }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let recommendProducts = await ctx.model.Product.findAll({
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

    if (_.isEmpty(recommendProducts)) {
      return [];
    }

    recommendProducts = await Promise.all(
      recommendProducts.map(async p => {
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

    return recommendProducts;
  }
}

module.exports = RecommendProductService;
