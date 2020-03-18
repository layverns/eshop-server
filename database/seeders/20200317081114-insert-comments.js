'use strict';
const _ = require('lodash');
const { getProducts } = require('./20200302084136-insert-products');

const comments = [
  {
    subtitle: '6种烘焙风格，一盒尽享',
    user_id: 1,
    specs: '24颗(1-6号)',
    stars: 1,
    text: '目前才喝了1号和6号。清咖果然很刺激啊，还是适合喝奶咖，包装用来种多肉啦，很可爱的',
    images: [
      'https://yanxuan.nosdn.127.net/516c8c08d56d432bf57af927907204fe.jpg',
      'https://yanxuan.nosdn.127.net/c71e60a820f8da0ebb5fb2db1e70bbc8.jpg',
      'https://yanxuan.nosdn.127.net/0e193e1b824de3c0a167e911e7203591.jpg',
      'https://yanxuan.nosdn.127.net/537fd441a3acf95511ac53f38eb218df.jpg',
      'https://yanxuan.nosdn.127.net/5ebf1dffd14322936ff9d37753f7deda.jpg',
    ],
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    user_id: 2,
    specs: '颜色:枫叶红 尺码:M',
    stars: 2,
    text: '浴室之魔幻光照下，我竟然觉得这套睡衣有点美？',
    images: ['https://yanxuan.nosdn.127.net/858821d979a279a5fecfdd69ef0adb0a.jpg', 'https://yanxuan.nosdn.127.net/3d9f29c4dc9e6c9c063088a6c1142acb.jpg'],
  },
  {
    subtitle: '物理不粘无涂层，耐磨耐用',
    user_id: 3,
    specs: '口径:30cm/窄边玻盖/电磁炉不可用',
    stars: 3,
    text: '质量好，颜值高，不是很沉，单手可操作，到手就开锅了，期待明天的使用',
    images: ['https://yanxuan.nosdn.127.net/0b8af9001ce0cfe9af79eb04fb56821e.jpg', 'https://yanxuan.nosdn.127.net/2c399ba06fd0b5935793f552801579c2.jpg'],
  },
  {
    subtitle: '新世界经典混酿代表',
    user_id: 4,
    specs: '规格:750毫升*6',
    stars: 4,
    text: '口感非常不错，都说好，所以就回购了，这个价位一般只能买到12-13%的，这款是14%度，真心给力。',
    images: ['https://yanxuan.nosdn.127.net/f145f07280d16e4f7bf40290bd00df70.jpg', 'https://yanxuan.nosdn.127.net/720b890eb1b5902c41b24a43649c0c74.jpg'],
  },
  {
    subtitle: '轻薄设计，简约大方',
    user_id: 5,
    specs: '颜色:金色',
    stars: 5,
    text: '剪刀很好，小巧精致，第一次在网易严选卖东西，体验感不错！',
    images: ['https://yanxuan.nosdn.127.net/32e90430349fab95fa0b76247df69774.jpg'],
  },
  {
    subtitle: '高速破壁，彻底释放营养',
    user_id: 1,
    specs: '颜色:灰紫色',
    stars: 5,
    text: '收到就迫不及待地试用了豆浆功能，28分钟打出来的豆浆口感细腻绵软，比之前的豆浆机好太多，全家都喜欢喝。除了声音太响，其他满分💯',
    images: ['https://yanxuan.nosdn.127.net/a21ea58004841becc809a1e6aff35635.jpg', 'https://yanxuan.nosdn.127.net/60ca37d9549057cb3c4755b31ed048c2.jpg'],
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    user_id: 2,
    specs: '型号:iPhone7/8 Plus 颜色:朱雀红',
    stars: 4,
    text: '樱花粉，超级美的颜色！',
    images: ['https://yanxuan.nosdn.127.net/c2eeecf49206a33ac43f3f76862895c8.jpg', 'https://yanxuan.nosdn.127.net/0b2a57de30ee659301462d3a01428fa0.jpg'],
  },
  {
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸。',
    user_id: 3,
    specs: '材质:胡桃木',
    stars: 3,
    text: '经历疫情的单子终于到了手里',
    images: ['https://yanxuan.nosdn.127.net/5d9054d20358f512dc89b6318cb4141c.jpg', 'https://yanxuan.nosdn.127.net/8a890fc22b802aa2fc8ad06e006a449b.jpg'],
  },
];

function getComments() {
  let allComments = [];
  for (let i = 0; i < 50; i++) {
    allComments = allComments.concat(comments.map(c => ({ ...c, text: c.text + (i + 1), images: JSON.stringify(c.images) })));
  }

  return _.flatten(
    getProducts().map((p, index) =>
      allComments
        .filter(c => p.subtitle == c.subtitle)
        .map(c =>
          _.omit(
            {
              product_id: index + 1,
              ...c,
            },
            ['subtitle']
          )
        )
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('comments', getComments());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('comments', null, {});
  },
};
