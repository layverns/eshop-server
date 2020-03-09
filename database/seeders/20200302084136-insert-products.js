'use strict';
const _ = require('lodash');
const { getThirdcategories } = require('./20200301140016-insert-third_categories');

const products = [
  {
    title: '3秒一杯，超即溶精品咖啡 24颗',
    subtitle: '6种烘焙风格，一盒尽享',
    images: [
      'https://yanxuan-item.nosdn.127.net/41ceec9f74f2ea5b4e40c92b192f4136.png',
      'https://yanxuan-item.nosdn.127.net/d5d061c6c2ec3fc35220f55a7e48deab.jpg',
      'https://yanxuan-item.nosdn.127.net/ba3518b749e5d8b5dd1ba10e1a9f5e33.jpg',
      'https://yanxuan-item.nosdn.127.net/4d0ae5502b21ef5c832a74441b5c3c42.jpg',
      'https://yanxuan-item.nosdn.127.net/10a65a661aeb27006186f57ace454da4.png',
    ],
  },
  {
    title: '冬日宅家绝配本命，女式经典法兰绒居家套装',
    subtitle: '安心101%棉 全棉的软糯与柔情',
    images: [
      'https://yanxuan-item.nosdn.127.net/04e2340099b29daf1bb3b99424c2f6c0.png',
      'https://yanxuan-item.nosdn.127.net/fa838fd7cdd0b7400165fdab60a2c977.png',
      'https://yanxuan-item.nosdn.127.net/94984e061b0f70db73996a15ba2b6a58.png',
      'https://yanxuan-item.nosdn.127.net/3a1a95e025775b999e8a7ce4919b0903.png',
      'https://yanxuan-item.nosdn.127.net/8455c8c3de5aa17c108d79913f56678c.png',
    ],
  },
  {
    title: '炒出家的味道 中华精铁爆炒锅',
    subtitle: '物理不粘无涂层，耐磨耐用',
    images: [
      'https://yanxuan-item.nosdn.127.net/ca33501c2d6e03bed2dc8e00cf571fdc.png',
      'https://yanxuan-item.nosdn.127.net/fb6b455a6875a5fe1d7eaacdecf6ebc6.jpg',
      'https://yanxuan-item.nosdn.127.net/29ae8a1c93d03a31b4ce2385bef98692.jpg',
      'https://yanxuan-item.nosdn.127.net/6aa6f6817365607a9d96f446a6d22683.jpg',
      'https://yanxuan-item.nosdn.127.net/c89c4c86c6cb31805bd537d8c772a231.png',
    ],
  },
  {
    title: '澳洲西拉干红 750毫升',
    subtitle: '新世界经典混酿代表',
    images: [
      'https://yanxuan-item.nosdn.127.net/88b74c01e5af29d154678b57422eacd1.png',
      'https://yanxuan-item.nosdn.127.net/f8f61b2ced6ed6a72d07a8e74ed7d5ac.jpg',
      'https://yanxuan-item.nosdn.127.net/bb852bf08cabd2fc52135b61f257c3f0.jpg',
      'https://yanxuan-item.nosdn.127.net/ca33501c2d6e03bed2dc8e00cf571fdc.png',
      'https://yanxuan-item.nosdn.127.net/8b32b56df035904598cfb6ffc4cea76c.png',
    ],
  },
  {
    title: '剪出精致感，金致圆柄复古剪刀',
    subtitle: '轻薄设计，简约大方',
    images: [
      'https://yanxuan-item.nosdn.127.net/ade0ec4f0d2d56c723becb8002a69f75.png',
      'https://yanxuan-item.nosdn.127.net/4c6a9c8a579b00e5e9c7b002d15a33a2.jpg',
      'https://yanxuan-item.nosdn.127.net/f832555ef368be44b530dfc4e70e96b8.jpg',
      'https://yanxuan-item.nosdn.127.net/e1c46f4d3ad7c0c4a511214a2756e2fc.jpg',
      'https://yanxuan-item.nosdn.127.net/e52eb92a519a268c4b6c54c4ad2bb95d.png',
    ],
  },
  {
    title: '热豆浆鲜果汁分杯不串味 多功能破壁机',
    subtitle: '高速破壁，彻底释放营养',
    images: [
      'https://yanxuan-item.nosdn.127.net/000145de66f32a33aa4874585af32cd1.png',
      'https://yanxuan-item.nosdn.127.net/d93c96638754dedc829d8690db73c3fa.jpg',
      'https://yanxuan-item.nosdn.127.net/d8466422e909b42c6824a70c3c43c96c.jpg',
      'https://yanxuan-item.nosdn.127.net/be606e03ed1f7e6c7c5082b6f6749eac.jpg',
      'https://yanxuan-item.nosdn.127.net/6cdb3da46a4b95b36dea89d6d47d3bd9.png',
    ],
  },
  {
    title: '网易智造云感手机保护壳（iPhone系列）',
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    images: [
      'https://yanxuan-item.nosdn.127.net/2d6b904324ec63abff04673e98535efe.png',
      'https://yanxuan-item.nosdn.127.net/1d53d199c495ba068701d1d275dd978d.jpg',
      'https://yanxuan-item.nosdn.127.net/f731642df64ed1fae23a1f7b7a06e4d3.jpg',
      'https://yanxuan-item.nosdn.127.net/f4545841dab352ec237fa16ea4d73af4.jpg',
      'https://yanxuan-item.nosdn.127.net/56f91176e5820530411a0e1ac9487f4b.png',
    ],
  },
  {
    title: '网易云音乐 易系列尤克里里 入门款23寸',
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    images: [
      'https://yanxuan-item.nosdn.127.net/748d6326bf5df793303250b58aa6e5eb.png',
      'https://yanxuan-item.nosdn.127.net/2e6d5d6acb2c29aa2964d5a8da0da762.png',
      'https://yanxuan-item.nosdn.127.net/2d71bb76210e626a7f0eddb04277b7c9.png',
      'https://yanxuan-item.nosdn.127.net/aa49a0993a981a2463c3f0f5e888b914.png',
      'https://yanxuan-item.nosdn.127.net/669dba51e7d2cc697333b05ea407a1ed.png',
    ],
  },
];

function getProducts() {
  let count = 1;
  return _.flatten(
    getThirdcategories().map((th, index) =>
      products.map(p => ({
        ...p,
        title: p.title + count++,
        images: JSON.stringify(p.images),
        third_category: index + 1,
      }))
    )
  );
}

module.exports = {
  getProducts,

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', getProducts());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
