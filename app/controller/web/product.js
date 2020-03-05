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
}

module.exports = ProductController;
