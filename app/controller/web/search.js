'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');

class SearchController extends Controller {
  async getHotWords() {
    const { ctx } = this;

    const hotWords = await ctx.service.web.search.getHotWords();

    ctx.body = {
      hotWords,
    };
  }
}

module.exports = SearchController;
