'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CategoryService extends Service {
  async getList() {
    const { ctx } = this;

    const thirdCats = await ctx.model.ThirdCategory.findAll({ raw: true, attributes: ['id', 'subcategoryId', 'title', 'image'] });

    const thirdCatsGroup = _.groupBy(thirdCats, 'subcategoryId');

    let subcats = await ctx.model.Subcategory.findAll({ raw: true, attributes: ['id', 'categoryId', 'title'] });

    subcats = subcats.map(sc => ({ ...sc, thirdCategories: thirdCatsGroup[sc.id] }));

    const subcatsGroup = _.groupBy(subcats, 'categoryId');

    let cats = await ctx.model.Category.findAll({ raw: true, attributes: ['id', 'title'] });

    cats = cats.map(c => ({ ...c, subcategories: subcatsGroup[c.id] }));

    return cats;
  }

  async getCategoryList() {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    const categories = await ctx.model.Category.findAll({ raw: true, attributes: ['id', 'title'] });
    console.log('categories: ', categories);

    let categoryList = await Promise.all(
      categories.map(async c => {
        let thirdCategories = await ctx.model.ThirdCategory.findAll({
          raw: true,
          where: { categoryId: c.id },
          attributes: ['id', 'categoryId', 'title'],
          limit: 7,
        });

        let carousels = await ctx.model.Carousel.findAll({
          raw: true,
          where: { categoryId: c.id },
          attributes: ['id', 'image'],
        });

        let products = await ctx.model.Product.findAll({
          raw: true,
          where: { thirdCategoryId: { [Sequelize.Op.in]: thirdCategories.map(tc => tc.id) } },
          limit: 4,
          attributes: {
            include: [
              [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
              [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
              [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
            ],
            exclude: ['details'],
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

        return {
          ...c,
          products,
          thirdCategories,
          carousels,
        };
      })
    );

    return categoryList;
  }

  async getDetail({ id }) {
    const { ctx } = this;

    let category = await ctx.model.Category.findOne({ raw: true, where: { id }, attributes: ['id', 'title'] });

    let thirdCategories = await ctx.model.ThirdCategory.findAll({
      raw: true,
      where: { categoryId: id },
      attributes: ['id', 'categoryId', 'title', 'image'],
    });

    return {
      category,
      thirdCategories,
    };
  }
}

module.exports = CategoryService;
