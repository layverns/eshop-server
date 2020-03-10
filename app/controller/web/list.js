'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

const { ERRORS, ServerError } = require('../../libs/errors');

class ListController extends Controller {
  async getDetail() {
    const { ctx } = this;

    const category_id = ctx.params.category_id;
    if (!validator.isNumeric(category_id + '')) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const list = await ctx.service.web.list.getDetail(category_id);

    ctx.body = {
      list,
    };
  }
}

module.exports = ListController;
