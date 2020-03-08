'use strict';

const Controller = require('egg').Controller;
const { ERRORS, ServerError } = require('../../libs/errors');

class TimeProductController extends Controller {
  async getList() {
    const { ctx } = this;
    const offset = Number.parseInt(ctx.request.query.offset || 0);
    const limit = Number.parseInt(ctx.request.query.limit || 7);

    if (Number.isNaN(offset) || Number.isNaN(limit)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const timeProducts = await ctx.service.web.timeProduct.getList({ offset, limit });

    ctx.body = {
      timeProducts,
    };
  }
}

module.exports = TimeProductController;
