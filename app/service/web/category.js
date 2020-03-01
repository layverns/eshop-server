'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

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
}

module.exports = CategoryService;
