'use strict';

const Service = require('egg').Service;

class SearchService extends Service {
  async getHotWords() {
    const { ctx } = this;

    const hotWords = await ctx.model.HotWord.findAll({ raw: true, order: [['search_count', 'desc']] });

    return hotWords;
  }
}

module.exports = SearchService;
