'use strict';

const Controller = require('egg').Controller;
const { ERRORS, ServerError } = require('../../libs/errors');

class NewProductController extends Controller {
  async getList() {
    const { ctx } = this;
    const offset = Number.parseInt(ctx.request.query.offset || 0);
    const limit = Number.parseInt(ctx.request.query.limit || 16);

    if (Number.isNaN(offset) || Number.isNaN(limit)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const newProducts = await ctx.service.web.newProduct.getList({ offset, limit });

    ctx.body = {
      newProducts,
    };
  }
}

module.exports = NewProductController;
