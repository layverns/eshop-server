'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class OrderController extends Controller {
  async create() {
    const { ctx } = this;

    let user = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    await ctx.service.web.order.create({ user });

    ctx.body = {};
  }
}

module.exports = OrderController;
