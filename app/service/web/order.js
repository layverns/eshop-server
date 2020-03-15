'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { ERRORS, ServerError } = require('../../libs/errors');
const { getInfoOfSpecs } = require('../../libs/utils');
const moment = require('moment');

class OrderService extends Service {
  async create({ user }) {
    const { ctx } = this;

    const carts = await ctx.service.web.cart.getList(user);
    if (_.isEmpty(carts)) {
      throw new ServerError('购物车还没有商品！', ERRORS.VALIDATION.CODE);
    }

    let now = moment();
    let no = '' + now.year() + now.month() + now.date() + now.hour() + now.minute() + now.second() + now.millisecond();
    let order = await ctx.model.Order.create({ user, no });

    order = order.get({ plain: true });

    let orderItems = carts.map(c => {
      const {
        specs,
        productSpecs,
        productInfo: { prices, old_prices },
      } = c;
      let price = getInfoOfSpecs(specs, productSpecs, prices);
      let old_price = getInfoOfSpecs(specs, productSpecs, old_prices);

      let allSpecs = specs
        .map((s, index) => {
          const productSpec = productSpecs[index];
          const spec = productSpec.filter(ps => ps.id == s)[0];
          return spec.title;
        })
        .join(' ');

      return {
        product: c.id,
        image: c.images[0],
        title: c.title,
        specs: allSpecs,
        price,
        old_price,
        quantity: c.quantity,
        order: order.id,
      };
    });

    await ctx.model.OrderItem.bulkCreate(orderItems);
    await ctx.service.web.cart.deleteAll(user);
  }
}

module.exports = OrderService;
