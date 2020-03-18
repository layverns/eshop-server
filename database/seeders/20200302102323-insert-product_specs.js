'use strict';
const _ = require('lodash');
const { getProducts } = require('./20200302084136-insert-products');

const product_specs = [
  {
    subtitle: '6种烘焙风格，一盒尽享',
    spec: '规格',
    title: '24颗(1-6号)',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/41ceec9f74f2ea5b4e40c92b192f4136.png',
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '颜色',
    title: '樱花粉',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/7a102971d12cbebc20b75cefdcef531a.png',
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '颜色',
    title: '粉色格纹',
    order: 0,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/7e313dd8241239d9f35921598cda1ba2.png',
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '颜色',
    title: '灰色格纹',
    order: 0,
    index: 2,
    image: 'https://yanxuan-item.nosdn.127.net/a819a3d887c12e81af24143336fb2c66.png',
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '尺码',
    title: 'S',
    order: 1,
    index: 0,
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '尺码',
    title: 'M',
    order: 1,
    index: 1,
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '尺码',
    title: 'L',
    order: 1,
    index: 2,
  },
  {
    subtitle: '安心101%棉 全棉的软糯与柔情',
    spec: '尺码',
    title: 'XL',
    order: 1,
    index: 3,
  },
  {
    subtitle: '物理不粘无涂层，耐磨耐用',
    spec: '口径',
    title: '30cm/窄边玻盖/电磁炉不可用',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/09e4a134c5299c6de2b9bd4c3054dc71.png',
  },
  {
    subtitle: '物理不粘无涂层，耐磨耐用',
    spec: '口径',
    title: '33cm/宽边玻盖/电磁炉不可用',
    order: 0,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/4ccd6ee87a83918474e7e962b06d96fd.png',
  },
  {
    subtitle: '新世界经典混酿代表',
    spec: '规格',
    title: '750毫升',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/6526c73f18b90a18a249aa0c37918fc9.png',
  },
  {
    subtitle: '新世界经典混酿代表',
    spec: '规格',
    title: '750毫升*6',
    order: 0,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/45fe89d425ca73917569a7c228f1499a.png',
  },
  {
    subtitle: '轻薄设计，简约大方',
    spec: '颜色',
    title: '磨砂黑',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/e25e512afd9c039285c8d9fb0628affd.png',
  },
  {
    subtitle: '轻薄设计，简约大方',
    spec: '颜色',
    title: '金色',
    order: 0,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/7df3a2d656b1843abe7a67155ae3a178.png',
  },
  {
    subtitle: '高速破壁，彻底释放营养',
    spec: '颜色',
    title: '灰紫色',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/000145de66f32a33aa4874585af32cd1.png',
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '型号',
    title: 'IPhoneX',
    order: 0,
    index: 0,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '型号',
    title: 'IPhoneXs',
    order: 0,
    index: 1,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '型号',
    title: 'IPhoneXr',
    order: 0,
    index: 2,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '颜色',
    title: '深空黑',
    order: 1,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/f936210231a6c7452c1c4541ac32c2f0.png',
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '颜色',
    title: '午夜蓝',
    order: 1,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/372a96f37a2c2e1cc892447ea553fe68.png',
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '内存',
    title: '64GB',
    order: 2,
    index: 0,
  },
  {
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    spec: '内存',
    title: '128GB',
    order: 2,
    index: 1,
  },
  {
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    spec: '颜色',
    title: '桃花芯',
    order: 0,
    index: 0,
    image: 'https://yanxuan-item.nosdn.127.net/093e300741d8c9be670abefd24b57ab7.jpg',
  },
  {
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    spec: '颜色',
    title: '胡桃木',
    order: 0,
    index: 1,
    image: 'https://yanxuan-item.nosdn.127.net/17b933ac5f83a4a11d3ee7daa6a1c084.jpg',
  },
];

function getProductSpecs() {
  return _.flatten(
    getProducts().map((p, index) =>
      product_specs
        .filter(ps => p.subtitle == ps.subtitle)
        .map(ps =>
          _.omit(
            {
              product_id: index + 1,
              ...ps,
            },
            ['subtitle']
          )
        )
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_specs', getProductSpecs());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_specs', null, {});
  },
};
