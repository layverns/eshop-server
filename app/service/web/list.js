'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

const { getFirstNum } = require('../../libs/utils');

class ListService extends Service {
  async getDetail(id) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    const category = await ctx.model.Category.findOne({ raw: true, where: { id }, attributes: ['id', 'title'] });

    const images = await ctx.model.Carousel.findAll({ raw: true, where: { category: id }, attributes: ['id', 'image'] });

    const subcats = await ctx.model.Subcategory.findAll({ raw: true, where: { category: id }, attributes: ['id', 'title'] });

    let thirdCategories = await ctx.model.ThirdCategory.findAll({
      raw: true,
      where: { subcategory: { [Sequelize.Op.in]: subcats.map(sc => sc.id) } },
      attributes: ['id', 'title'],
    });

    let products = await ctx.model.Product.findAll({
      raw: true,
      where: { third_category: { [Sequelize.Op.in]: thirdCategories.map(tc => tc.id) } },
      attributes: ['id', 'title', 'subtitle', 'images', 'third_category'],
      order: [['created_at', 'desc']],
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

    let productsGroup = _.groupBy(products, 'third_category');
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