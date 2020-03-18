'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { ERRORS, ServerError } = require('../../libs/errors');

class CartService extends Service {
  async update({ quantity }, where) {
    const { ctx } = this;

    if (quantity > 99) quantity = 99;
    if (quantity < 1) quantity = 1;

    await ctx.model.Cart.update({ quantity }, { where });
  }

  async check(where) {
    const { ctx } = this;

    let product = await ctx.model.Cart.findOne({ where, raw: true });
    if (_.isEmpty(product)) {
      throw new ServerError('未找到该产品!', ERRORS.NOT_FOUND.CODE);
    }
    await ctx.model.Cart.update({ isChecked: !product.isChecked }, { where });
  }

  async checkAll(where) {
    const { ctx } = this;

    await ctx.model.Cart.update({ isChecked: true }, { where });
  }

  async unCheckAll(where) {
    const { ctx } = this;

    await ctx.model.Cart.update({ isChecked: false }, { where });
  }

  async upsert({ productId, specs, quantity, userId }) {
    const { ctx } = this;

    let cart = await ctx.model.Cart.findOne({ where: { productId, specs: JSON.stringify(specs), userId }, raw: true });
    if (_.isEmpty(cart)) {
      let isChecked = true;
      cart = await ctx.model.Cart.create({ productId, quantity, userId, isChecked, specs: JSON.stringify(fields.specs) }, { raw: true });
      cart = cart.get({ plain: true });
    } else {
      quantity = cart.quantity + quantity;
      quantity = quantity > 99 ? 99 : quantity;
      await ctx.model.Cart.update({ quantity }, { where: { id: cart.id } });
      cart.quantity = quantity;
    }

    return cart;
  }

  async delete(where) {
    const { ctx } = this;

    await ctx.model.Cart.destroy(where);
  }

  async deleteAll(where) {
    const { ctx } = this;

    await ctx.model.Cart.destroy({ where });
  }

  async getList(where) {
    const { ctx } = this;

    let carts = await ctx.model.Cart.findAll({ where, raw: true });

    carts = carts.map(async c => {
      const product = await ctx.service.web.product.getDetail({ id: c.productId });
      return _.omit(
        {
          ...c,
          specs: JSON.parse(c.specs),
          ...product,
        },
        ['userId', 'productId']
      );
    });

    carts = await Promise.all(carts);
    return carts;
  }
}

module.exports = CartService;
