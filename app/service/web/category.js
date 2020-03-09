'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

class CategoryService extends Service {
  async getList() {
    const { ctx } = this;

    const thirdCats = await ctx.model.ThirdCategory.findAll({ raw: true, attributes: ['id', 'subcategory', 'title', 'image'] });

    const thirdCatsGroup = _.groupBy(thirdCats, 'subcategory');

    let subcats = await ctx.model.Subcategory.findAll({ raw: true, attributes: ['id', 'category', 'title'] });

    subcats = subcats.map(sc => ({ ...sc, thirdCategories: thirdCatsGroup[sc.id] }));

    const subcatsGroup = _.groupBy(subcats, 'category');

    let cats = await ctx.model.Category.findAll({ raw: true, attributes: ['id', 'title'] });

    cats = cats.map(c => ({ ...c, subcategories: subcatsGroup[c.id] }));

    return cats;
  }

  async getAllCarousels() {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let cats = await ctx.model.Category.findAll({ raw: true, attributes: ['id', 'title'] });

    let allCarousels = cats.map(async c => {
      const images = await ctx.model.Carousel.findAll({ raw: true, where: { category: c.id }, attributes: ['id', 'image'] });

      const subcats = await ctx.model.Subcategory.findAll({ raw: true, where: { category: c.id }, attributes: ['id', 'title'] });

      const thirdCategories = await ctx.model.ThirdCategory.findAll({
        raw: true,
        where: { subcategory: { [Sequelize.Op.in]: subcats.map(sc => sc.id) } },
        attributes: ['id', 'title'],
      });

      let products = await ctx.model.Product.findAll({
        raw: true,
        where: { third_category: { [Sequelize.Op.in]: thirdCategories.map(tc => tc.id) } },
        attributes: ['id', 'title', 'subtitle', 'images'],
        limit: 4,
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
      return {
        ...c,
        images,
        products,
        thirdCategories: thirdCategories.slice(0, 7),
      };
    });

    allCarousels = await Promise.all(allCarousels);
    return allCarousels;
  }
}

module.exports = CategoryService;
