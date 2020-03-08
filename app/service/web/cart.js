'use strict';

const Service = require('egg').Service;
const _ = require('lodash');

class CartService extends Service {
  async upsert(fields) {
    const { ctx } = this;

    let cart = await ctx.model.Cart.findOne({ where: { product: fields.product, specs: JSON.stringify(fields.specs) }, raw: true });
    if (_.isEmpty(cart)) {
      cart = await ctx.model.Cart.create({ ...fields, specs: JSON.stringify(fields.specs) }, { raw: true });
      cart = cart.get({ plain: true });
    } else {
      let quantity = cart.quantity + fields.quantity;
      await ctx.model.Cart.update({ quantity }, { where: { id: cart.id } });
      cart.quantity = quantity;
    }

    return cart;
  }

  async getList(user) {
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
