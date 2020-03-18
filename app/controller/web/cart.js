'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class CartController extends Controller {
  async getList() {
    const { ctx } = this;

    let userId = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    const carts = await ctx.service.web.cart.getList({ userId });

    ctx.body = {
      carts,
    };
  }

  async create() {
    const { ctx } = this;
    let { productId, specs, quantity } = ctx.request.body;

    let userId = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (!validator.isNumeric(productId + '') || !validator.isNumeric(quantity + '') || _.isEmpty(specs)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const cart = await ctx.service.web.cart.upsert({ productId, specs, quantity, userId });

    ctx.body = {
      cart,
    };
  }

  async update() {
    const { ctx } = this;
    let { productId, specs, quantity = 1 } = ctx.request.body;

    let userId = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (!validator.isNumeric(productId + '') || !validator.isNumeric(quantity + '') || _.isEmpty(specs)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    await ctx.service.web.cart.update({ quantity }, { productId, specs: JSON.stringify(specs), quantity, userId });

    ctx.body = {};
  }

  async check() {
    const { ctx } = this;
    let { productId, specs } = ctx.request.body;

    let userId = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (!validator.isNumeric(productId + '') || _.isEmpty(specs)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    await ctx.service.web.cart.check({ productId, specs: JSON.stringify(specs), userId });

    ctx.body = {};
  }

  async checkAll() {
    const { ctx } = this;

    let userId = _.get(ctx, 'state.user.sub.id', null);
    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    await ctx.service.web.cart.checkAll({ userId });

    ctx.body = {};
  }

  async unCheckAll() {
    const { ctx } = this;

    let userId = _.get(ctx, 'state.user.sub.id', null);
    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    await ctx.service.web.cart.unCheckAll({ userId });

    ctx.body = {};
  }

  async delete() {
    const { ctx } = this;
    let { productId, specs } = ctx.request.body;

    let userId = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(userId + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (!validator.isNumeric(productId + '') || _.isEmpty(specs)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    await ctx.service.web.cart.delete({ productId, specs: JSON.stringify(specs), userId });

    ctx.body = {};
  }
}

module.exports = CartController;
