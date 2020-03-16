'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { ERRORS, ServerError } = require('../../libs/errors');

class CartService extends Service {
  async update(fields) {
    const { ctx } = this;

    let quantity = fields.quantity;
    if (quantity > 99) quantity = 99;
    if (quantity < 1) quantity = 1;
    await ctx.model.Cart.update({ quantity }, { where: { product: fields.product, specs: JSON.stringify(fields.specs) } });
  }

  async check(fields) {
    const { ctx } = this;

    let product = await ctx.model.Cart.findOne({ where: { product: fields.product, specs: JSON.stringify(fields.specs) }, raw: true });
    if (_.isEmpty(product)) {
      throw new ServerError('未找到该产品!', ERRORS.NOT_FOUND.CODE);
    }
    await ctx.model.Cart.update({ isChecked: !product.isChecked }, { where: { product: fields.product, specs: JSON.stringify(fields.specs) } });
  }

  async checkAll({ user }) {
    const { ctx } = this;

    await ctx.model.Cart.update({ isChecked: true }, { where: { user } });
  }

  async unCheckAll({ user }) {
    const { ctx } = this;

    await ctx.model.Cart.update({ isChecked: false }, { where: { user } });
  }

  async upsert(fields) {
    const { ctx } = this;

    let cart = await ctx.model.Cart.findOne({ where: { product: fields.product, specs: JSON.stringify(fields.specs) }, raw: true });
    if (_.isEmpty(cart)) {
      fields.isChecked = true;
      cart = await ctx.model.Cart.create({ ...fields, specs: JSON.stringify(fields.specs) }, { raw: true });
      cart = cart.get({ plain: true });
    } else {
      let quantity = cart.quantity + fields.quantity;
      quantity = quantity > 99 ? 99 : quantity;
      await ctx.model.Cart.update({ quantity }, { where: { id: cart.id } });
      cart.quantity = quantity;
    }

    return cart;
  }

  async delete(fields) {
    const { ctx } = this;

    await ctx.model.Cart.destroy({ where: { product: fields.product, specs: JSON.stringify(fields.specs) } });
  }

  async deleteAll(user) {
    const { ctx } = this;

    await ctx.model.Cart.destroy({ where: { user } });
  }

  async getList({user}) {
    const { ctx } = this;

    let carts = await ctx.model.Cart.findAll({ where: { user }, raw: true });

    carts = carts.map(async c => {
      const product = await ctx.service.web.product.getDetail(c.product);
      return _.omit(
        {
          ...c,
          specs: JSON.parse(c.specs),
          ...product,
        },
        ['user', 'product']
      );
    });

    carts = await Promise.all(carts);
    return carts;
  }
}

module.exports = CartService;
