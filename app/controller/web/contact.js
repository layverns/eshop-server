'use strict';

const Controller = require('egg').Controller;
const validator = require('validator');
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class ProductController extends Controller {
  async create() {
    const { ctx } = this;
    let { province, city, district, address, person, phone } = ctx.request.body.contact;

    let user = _.get(ctx, 'state.user.sub.id', null);

    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }
    if (_.isEmpty(province) || _.isEmpty(city) || _.isEmpty(district) || _.isEmpty(address) || _.isEmpty(person) || _.isEmpty(phone)) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    await ctx.service.web.contact.create({ province, city, district, address, person, phone, user });

    ctx.body = {};
  }

  async getDetail() {
    const { ctx } = this;

    const id = ctx.params.id;
    if (!validator.isByteLength(id, { min: 1 })) {
      throw new ServerError('参数错误!', ERRORS.VALIDATION.CODE);
    }

    const contact = await ctx.service.web.contact.getDetail(id);

    ctx.body = {
      contact,
    };
  }

  async getList() {
    const { ctx } = this;
    const offset = Number.parseInt(ctx.query.offset || 0);
    const limit = Number.parseInt(ctx.query.limit || 100);

    let user = _.get(ctx, 'state.user.sub.id', null);
    if (!validator.isNumeric(user + '')) {
      throw new ServerError('登陆信息失效!', ERRORS.AUTHENTICATION.CODE);
    }

    const contacts = await ctx.service.web.contact.getList({ offset, limit, user });

    ctx.body = {
      contacts,
    };
  }
}

module.exports = ProductController;
