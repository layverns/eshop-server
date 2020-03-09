'use strict';
const _ = require('lodash');
const { getProducts } = require('./20200302084136-insert-products');

const product_tag = [
  {
    subtitle: '6种烘焙风格，一盒尽享',
    tag: 2,
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    tag: 1,
  },
  {
    subtitle: '物理不粘无涂层，耐磨耐用',
    tag: 3,
  },
  {
    subtitle: '新世界经典混酿代表',
    tag: 5,
  },
  {
    subtitle: '新世界经典混酿代表',
    tag: 4,
  },
  {
    subtitle: '轻薄设计，简约大方',
    tag: 1,
  },
  {
    subtitle: '高速破壁，彻底释放营养',
    tag: 1,
  },
  {
    subtitle: '高速破壁，彻底释放营养',
    tag: 5,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    tag: 2,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    tag: 4,
  },
  {
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    tag: 3,
  },
];

function getProductTag() {
  return _.flatten(
    getProducts().map((p, index) =>
      product_tag
        .filter(pt => p.subtitle == pt.subtitle)
        .map(pt =>
          _.omit(
            {
              product: index + 1,
              ...pt,
            },
            ['subtitle']
          )
        )
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_tags', getProductTag());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_tags', null, {});
  },
};
