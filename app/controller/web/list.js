'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

const { ERRORS, ServerError } = require('../../libs/errors');

class ListController extends Controller {
  async getDetail() {
    const { ctx } = this;

    const categoryId = ctx.params.categoryId;
    if (!validator.isNumeric(categoryId + '')) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const list = await ctx.service.web.list.getDetail({ categoryId });

    ctx.body = {
      list,
    };
  }
}

module.exports = ListController;
