'use strict';
const _ = require('lodash');

const thirdCategories = [
  {
    title: '抑菌防螨',
    image: 'https://yanxuan.nosdn.127.net/29e0b7d20a31fee3b6d9605831c26955.jpg',
  },
  {
    title: '温暖好物',
    image: 'https://yanxuan.nosdn.127.net/be2bb1f481165edf97d46ba6f7ea9c11.png',
  },
  {
    title: '春夏好物',
    image: 'https://yanxuan.nosdn.127.net/13d2bcc7cdccb92b2d7598c3e34c1458.jpg',
  },
  {
    title: '主题床品',
    image: 'https://yanxuan.nosdn.127.net/5a165042f413da1d6a01a25de0a65952.png',
  },
  {
    title: '客餐厅家具',
    image: 'https://yanxuan.nosdn.127.net/e8e017d7b6d53abdbcfc2b4d9d464f7f.png',
  },
  {
    title: '彩妆修容',
    image: 'https://yanxuan.nosdn.127.net/1014a40ee448b8e27301a00aa482fda6.png',
  },
  {
    title: '安全座椅',
    image: 'https://yanxuan.nosdn.127.net/4829f861279526d5dd4c913517847dd7.png',
  },
  {
    title: '智能家居',
    image: 'https://yanxuan.nosdn.127.net/c3dc742a74e228d9f60cd1ca2b275b11.png',
  },
  {
    title: '儿童鞋',
    image: 'https://yanxuan.nosdn.127.net/f3fb18cbeacca10fcda9a7f6db09df85.png',
  },
  {
    title: '车载用品',
    image: 'https://yanxuan.nosdn.127.net/34834625ca0b2dfcaf77eece185a1666.png',
  },
];

function getThirdcategories() {
  return _.flatten(
    Array.from({ length: 64 }).map((v, i) =>
      thirdCategories.slice(0, Math.ceil(Math.random() * thirdCategories.length)).map(t => ({
        ...t,
        subcategory: i + 1,
      }))
    )
  );
}

module.exports = {
  getThirdcategories,

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('third_categories', getThirdcategories());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('third_categories', null, {});
  },
};
