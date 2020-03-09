'use strict';

const Controller = require('egg').Controller;
const { ERRORS, ServerError } = require('../../libs/errors');

class PresentController extends Controller {
  async getList() {
    const { ctx } = this;
    const offset = Number.parseInt(ctx.request.query.offset || 0);
    const limit = Number.parseInt(ctx.request.query.limit || 4);

    if (Number.isNaN(offset) || Number.isNaN(limit)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const presentProducts = await ctx.service.web.presentProduct.getList({ offset, limit });

    ctx.body = {
      presentProducts,
    };
  }
}

module.exports = PresentController;
1;
