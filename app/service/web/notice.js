'use strict';

const Service = require('egg').Service;

class NoticeService extends Service {
  async getList() {
    const { ctx } = this;

    const notices = await ctx.model.Notice.findAll({ raw: true, attributes: ['id', 'title'] });

    return notices;
  }

  async getDetail(where) {
    const { ctx } = this;

    const notice = await ctx.model.Notice.findOne({ raw: true, where });

    return notice;
  }
}

module.exports = NoticeService;
