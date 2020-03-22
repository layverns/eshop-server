'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const { ERRORS, ServerError } = require('../../libs/errors');
const { getInfoOfSpecs } = require('../../libs/utils');
const moment = require('moment');

const ORDER_STATUS = [
  { STATUS: 0, TEXT: '未付款' },
  { STATUS: 1, TEXT: '待发货' },
  { STATUS: 2, TEXT: '已发货' },
  { STATUS: 3, TEXT: '待评论' },
  { STATUS: 4, TEXT: '已完成' },
  { STATUS: 5, TEXT: '已取消' },
];

class OrderService extends Service {
  async create({ userId }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    const carts = await ctx.service.web.cart.getList({ userId, isChecked: true });
    if (_.isEmpty(carts)) {
      throw new ServerError('购物车还没有商品！', ERRORS.VALIDATION.CODE);
    }

    let now = moment();
    let no = '' + now.year() + now.month() + now.date() + now.hour() + now.minute() + now.second() + now.millisecond();
    let order = await ctx.model.Order.create({ userId, no, status: ORDER_STATUS[0].STATUS });

    order = order.get({ plain: true });

    let orderItems = await Promise.all(
      carts.map(async c => {
        const {
          id,
          specs,
          quantity,
          productSpecs,
          productInfo: { prices, oldPrices },
          images,
          title,
        } = c;
        let price = getInfoOfSpecs(specs, productSpecs, prices);
        let oldPrice = getInfoOfSpecs(specs, productSpecs, oldPrices);

        let allSpecs = specs
          .map((s, index) => {
            const productSpec = productSpecs[index];
            const spec = productSpec.filter(ps => ps.id == s)[0];
            return spec.spec + ':' + spec.title;
          })
          .join(' ');

        return {
          productId: id,
          image: images[0],
          title: title,
          specs: allSpecs,
          price,
          oldPrice,
          quantity: quantity,
          orderId: order.id,
        };
      })
    );

    await ctx.model.OrderItem.bulkCreate(orderItems);
    await ctx.service.web.cart.deleteAll({ userId, isChecked: true });
  }

  async getList({ userId }) {
    const { ctx } = this;

    let orders = await ctx.model.Order.findAll({ where: { userId }, raw: true });

    orders = await Promise.all(
      orders.map(async o => {
        let orderItems = await ctx.model.OrderItem.findAll({
          raw: true,
          where: {
            orderId: o.id,
          },
          attributes: ['id', 'productId', 'image', 'price'],
        });

        orderItems = orderItems.map(oi => ({ ...oi, price: Number.parseFloat(oi.price) }));
        return {
          ...o,
          statusText: ORDER_STATUS[_.findIndex(ORDER_STATUS, OS => OS.STATUS == o.status)].TEXT,
          orderItems,
        };
      })
    );

    return orders;
  }

  async pay({ orderId }) {
    const { ctx } = this;

    await ctx.model.Order.update({ status: ORDER_STATUS[1].STATUS }, { where: { id: orderId } });
  }
}

module.exports = OrderService;
