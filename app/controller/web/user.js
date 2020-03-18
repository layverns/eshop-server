'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class UserController extends Controller {
  async get() {
    const { ctx } = this;

    let email = _.get(ctx, 'state.user.sub.email', null);
    if (!validator.isEmail(email)) {
      throw new ServerError('登陆信息失效!', ERRORS.VALIDATION.CODE);
    }

    const user = await ctx.service.web.user.get({ email });

    ctx.body = {
      user,
    };
  }

  async login() {
    const { ctx } = this;
    const { email, password } = ctx.request.body;

    if (!validator.isEmail(email)) {
      throw new ServerError('请输入正确的邮箱!', ERRORS.VALIDATION.CODE);
    }
    if (!validator.isLength(password, { min: 6 })) {
      throw new ServerError('密码必须大于6位!', ERRORS.VALIDATION.CODE);
    }

    const user = await ctx.service.web.user.login(email, password);

    ctx.body = {
      user,
    };
  }
}

module.exports = UserController;
