'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

const { ERRORS, ServerError } = require('../../libs/errors');

class ContactService extends Service {
  async upsert(fields) {
    const { ctx } = this;
    const { id, isDefault } = fields;

    if (isDefault == 1) {
      await ctx.model.Contact.update({ isDefault: 0 }, { where: { isDefault: 1 } });
    }

    if (!id) {
      await ctx.model.Contact.create({ ...fields }, { raw: true });
    } else {
      await ctx.model.Contact.update({ ...fields }, { where: { id } });
    }
  }

  async getDetail(where) {
    const { ctx } = this;

    const contact = await ctx.model.Contact.findOne({
      raw: true,
      where,
    });

    return contact;
  }

  async getList(where, { limit, offset }) {
    const { ctx } = this;

    let contacts = await ctx.model.Contact.findAll({
      where,
      limit,
      offset,
      order: [
        ['isDefault', 'desc'],
        ['updatedAt', 'desc'],
      ],
      attributes: ['id', 'province', 'city', 'district', 'address', 'person', 'phone', 'isDefault'],
      raw: true,
    });

    return contacts;
  }
}

module.exports = ContactService;
