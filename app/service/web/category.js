'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { getFirstNum } = require('../../libs/utils');

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

  async getDetail({ id }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let category = await ctx.model.Category.findOne({ raw: true, where: { id }, attributes: ['id', 'title'] });

    let subcategories = await ctx.model.Subcategory.findAll({
      raw: true,
      where: { categoryId: id },
      attributes: ['id', 'categoryId', 'title'],
    });

    let thirdCategories = await ctx.model.ThirdCategory.findAll({
      raw: true,
      where: { subcategoryId: { [Sequelize.Op.in]: subcategories.map(sc => sc.id) } },
      attributes: ['id', 'subcategoryId', 'title', 'image'],
    });

    thirdCategories = thirdCategories.map(tc => ({
      ...tc,
      categoryId: category.id,
    }));

    return {
      category,
      subcategories,
      thirdCategories,
    };
  }
}

module.exports = CategoryService;
