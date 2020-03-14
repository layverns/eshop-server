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
      console.log('create :', fields);
      await ctx.model.Contact.create({ ...fields }, { raw: true });
    } else {
      console.log('update : ', fields);
      await ctx.model.Contact.update({ ...fields }, { where: { id } });
    }
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

    let contacts = await ctx.model.Contact.findAll({
      where: { user },
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
