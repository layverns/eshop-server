'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

const { ERRORS, ServerError } = require('../../libs/errors');

class ProductController extends Controller {
  async getDetail() {
    const { ctx } = this;

    const id = ctx.params.id;
    if (!validator.isByteLength(id, { min: 1 })) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const product = await ctx.service.web.product.getDetail(id);

    ctx.body = {
      product,
    };
  }

  async getList() {
    const { ctx } = this;
    const offset = Number.parseInt(ctx.query.offset || 0);
    const limit = Number.parseInt(ctx.query.limit || 100);

    const thirdCategoryId = ctx.query.thirdCategoryId;

    const products = await ctx.service.web.product.getList({ thirdCategoryId, offset, limit });

    ctx.body = {
      products,
    };
  }
}

module.exports = ProductController;
