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

  async getList() {
    const { ctx } = this;

    let user = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    const orders = await ctx.service.web.order.getList({ user });

    ctx.body = {
      orders,
    };
  }

  async pay() {
    const { ctx } = this;
    const { orderId } = ctx.request.body;

    if (!validator.isNumeric(orderId + '')) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    await ctx.service.web.order.pay({ orderId });

    ctx.body = {};
  }
}

module.exports = OrderController;
