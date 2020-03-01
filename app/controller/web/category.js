'use strict';

const Controller = require('egg').Controller;

class CategoryController extends Controller {
  async getList() {
    const { ctx } = this;

    const categories = await ctx.service.web.category.getList();

    ctx.body = {
      categories,
    };
  }
}

module.exports = CategoryController;
