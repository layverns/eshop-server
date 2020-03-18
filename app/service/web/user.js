'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const { ERRORS, ServerError } = require('../../libs/errors');

class UserService extends Service {
  async get(where) {
    const { ctx } = this;

    const user = await ctx.model.User.findOne({ raw: true, where });
    if (_.isEmpty(user)) {
      throw new ServerError('该用户尚未注册!', ERRORS.VALIDATION.CODE);
    }

    return this.generateJWTforUser(user);
  }

  async login(email, password) {
    const { ctx } = this;

    const user = await ctx.model.User.findOne({ raw: true, where: { email } });
    if (_.isEmpty(user)) {
      throw new ServerError('该用户尚未注册!', ERRORS.VALIDATION.CODE);
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new ServerError('密码错误!', ERRORS.VALIDATION.CODE);
    }

    return this.generateJWTforUser(user);
  }

  generateJWTforUser = user => {
    const config = this.ctx.app.config;

    return _.omit(
      Object.assign({}, user, {
        token: jwt.sign(
          {
            sub: _.pick(user, ['id', 'email']),
          },
          config.jwtSecret,
          {
            expiresIn: '7d',
          }
        ),
      }),
      ['password']
    );
  };
}

module.exports = UserService;
