'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

class NoticeController extends Controller {
  async getList() {
    const { ctx } = this;

    const notices = await ctx.service.web.notice.getList();

    ctx.body = {
      notices,
    };
  }

  async getDetail() {
    const { ctx } = this;

    const id = ctx.params.id;
    if (!validator.isByteLength(id, { min: 1 })) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const notice = await ctx.service.web.notice.getDetail({ id });

    ctx.body = {
      notice,
    };
  }
}

module.exports = NoticeController;
