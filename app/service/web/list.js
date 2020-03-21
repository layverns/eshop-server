'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class ListService extends Service {
  async getDetail({ categoryId }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    const category = await ctx.model.Category.findOne({ raw: true, where: { id: categoryId }, attributes: ['id', 'title'] });

    const images = await ctx.model.Carousel.findAll({ raw: true, where: { categoryId }, attributes: ['id', 'image'] });

    const subcats = await ctx.model.Subcategory.findAll({ raw: true, where: { categoryId }, attributes: ['id', 'title'] });

    let thirdCategories = await ctx.model.ThirdCategory.findAll({
      raw: true,
      where: { subcategoryId: { [Sequelize.Op.in]: subcats.map(sc => sc.id) } },
      attributes: ['id', 'title'],
    });

    let products = await ctx.model.Product.findAll({
      raw: true,
      where: { thirdCategoryId: { [Sequelize.Op.in]: thirdCategories.map(tc => tc.id) } },
      order: [['created_at', 'desc']],
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
          [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
          [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
        ],
      },
    });

    products = await Promise.all(
      products.map(async p => {
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

    let productsGroup = _.groupBy(products, 'thirdCategoryId');
    thirdCategories = thirdCategories.map(tc => ({
      ...tc,
      products: productsGroup[tc.id],
    }));

    return {
      category,
      images,
      thirdCategories,
    };
  }
}

module.exports = ListService;
