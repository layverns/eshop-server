'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class ContactService extends Service {
  async create(fields) {
    const { ctx } = this;

    await ctx.model.Contact.create({ ...fields }, { raw: true });
  }

  async getDetail(id) {
    const { ctx } = this;

    const contact = await ctx.model.Contact.findOne({
      raw: true,
      where: { id },
    });

    return contact;
  }

  async getList({ limit, offset, user }) {
    const { ctx } = this;

    const contacts = await ctx.model.Contact.findAll({
      where: { user },
      limit,
      offset,
      order: [
        ['default', 'desc'],
        ['updatedAt', 'desc'],
      ],
      raw: true,
    });

    return contacts;
  }
}

module.exports = ContactService;
