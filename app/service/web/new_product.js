'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class NewProductService extends Service {
  async getList(where, { offset, limit }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let newProducts = await ctx.model.Product.findAll({
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

        return {
          ...p,
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return newProducts;
  }
}

module.exports = NewProductService;
