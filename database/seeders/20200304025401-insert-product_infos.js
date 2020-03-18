'use strict';
const _ = require('lodash');
const { getProducts } = require('./20200302084136-insert-products');

const product_infos = [
  {
    subtitle: '6种烘焙风格，一盒尽享',
    prices: JSON.stringify([179]),
    old_prices: JSON.stringify([219]),
    scores: JSON.stringify([17]),
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    prices: JSON.stringify([
      [119, 129, 139, 149],
      [219, 229, 239, 249],
      [319, 329, 339, 349],
    ]),
    old_prices: JSON.stringify([
      [219, 229, 239, 249],
      [319, 329, 339, 349],
      [419, 429, 439, 449],
    ]),
    scores: JSON.stringify([
      [11, 12, 13, 14],
      [21, 22, 23, 24],
      [31, 32, 33, 34],
    ]),
  },
  {
    subtitle: '物理不粘无涂层，耐磨耐用',
    prices: JSON.stringify([259, 319]),
    old_prices: JSON.stringify([300, 429]),
    scores: JSON.stringify([25, 31]),
  },
  {
    subtitle: '新世界经典混酿代表',
    prices: JSON.stringify([59, 289]),
    old_prices: JSON.stringify([69, 399]),
    scores: JSON.stringify([5, 28]),
  },
  {
    subtitle: '轻薄设计，简约大方',
    prices: JSON.stringify([9.9, 19.9]),
    old_prices: JSON.stringify([19.9, 29.9]),
    scores: JSON.stringify([0, 0]),
  },
  {
    subtitle: '高速破壁，彻底释放营养',
    prices: JSON.stringify([699]),
    old_prices: JSON.stringify([0]),
    scores: JSON.stringify([0]),
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    prices: JSON.stringify([
      [
        [29, 39],
        [49, 59],
      ],
      [
        [69, 79],
        [89, 99],
      ],
      [
        [109, 119],
        [129, 139],
      ],
    ]),
    old_prices: JSON.stringify([
      [
        [40, 50],
        [60, 70],
      ],
      [
        [80, 90],
        [100, 110],
      ],
      [
        [120, 130],
        [140, 150],
      ],
    ]),
    scores: JSON.stringify([
      [
        [1, 2],
        [3, 4],
      ],
      [
        [5, 6],
        [7, 8],
      ],
      [
        [9, 10],
        [11, 12],
      ],
    ]),
  },
  {
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    prices: JSON.stringify([359, 329]),
    old_prices: JSON.stringify([0, 0]),
    scores: JSON.stringify([35, 32]),
  },
];

function getProductInfos() {
  return _.flatten(
    getProducts().map((p, index) =>
      product_infos
        .filter(pi => p.subtitle == pi.subtitle)
        .map(pi =>
          _.omit(
            {
              product_id: index + 1,
              ...pi,
            },
            ['subtitle']
          )
        )
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_infos', getProductInfos());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_infos', null, {});
  },
};
