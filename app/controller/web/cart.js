'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class CartController extends Controller {
  async getList() {
    const { ctx } = this;

    let user = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    const carts = await ctx.service.web.cart.getList(user);

    ctx.body = {
      carts,
    };
  }

  async create() {
    const { ctx } = this;
    let { product, specs, quantity } = ctx.request.body.product;

    console.log(' product: ', product);
    console.log(' specs: ', specs[0]);
    let user = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (!validator.isNumeric(product + '') || !validator.isNumeric(quantity + '') || _.isEmpty(specs)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const cart = await ctx.service.web.cart.upsert({ product, specs, quantity, user });

    ctx.body = {
      cart,
    };
  }
}

module.exports = CartController;
