'use strict';

const Controller = require('egg').Controller;

class NewProductController extends Controller {
  async getList() {
    const { ctx } = this;

    const newProducts = await ctx.service.web.newProduct.getList();

    ctx.body = {
      newProducts,
    };
  }
}

module.exports = NewProductController;
