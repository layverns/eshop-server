'use strict';

const Controller = require('egg').Controller;
const { ERRORS, ServerError } = require('../../libs/errors');

class CategoryController extends Controller {
  async getList() {
    const { ctx } = this;

    const categories = await ctx.service.web.category.getList();

    ctx.body = {
      categories,
    };
  }

  async getDetail() {
    const { ctx } = this;
    const { id } = ctx.params;

    if (Number.isNaN(id)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const detail = await ctx.service.web.category.getDetail(id);

    ctx.body = {
      ...detail,
    };
  }

  async getAllCarousels() {
    const { ctx } = this;
    const { id } = ctx.params;

    if (Number.isNaN(id)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const categoryCarousels = await ctx.service.web.category.getAllCarousels();

    ctx.body = {
      categoryCarousels,
    };
  }
}

module.exports = CategoryController;
