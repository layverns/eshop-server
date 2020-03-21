'use strict';
const _ = require('lodash');
const { getSubcategories } = require('./20200301134627-insert-subcategories');

const images = [
  'https://yanxuan.nosdn.127.net/29e0b7d20a31fee3b6d9605831c26955.jpg',
  'https://yanxuan.nosdn.127.net/be2bb1f481165edf97d46ba6f7ea9c11.png',
  'https://yanxuan.nosdn.127.net/13d2bcc7cdccb92b2d7598c3e34c1458.jpg',
  'https://yanxuan.nosdn.127.net/5a165042f413da1d6a01a25de0a65952.png',
  'https://yanxuan.nosdn.127.net/e8e017d7b6d53abdbcfc2b4d9d464f7f.png',
  'https://yanxuan.nosdn.127.net/1014a40ee448b8e27301a00aa482fda6.png',
  'https://yanxuan.nosdn.127.net/4829f861279526d5dd4c913517847dd7.png',
  'https://yanxuan.nosdn.127.net/c3dc742a74e228d9f60cd1ca2b275b11.png',
  'https://yanxuan.nosdn.127.net/f3fb18cbeacca10fcda9a7f6db09df85.png',
  'https://yanxuan.nosdn.127.net/34834625ca0b2dfcaf77eece185a1666.png',
];

function getThirdcategories() {
  let count = 1;
  return _.flatten(
    getSubcategories().map((sc, index) =>
      Array.from({ length: 10 })
        .slice(0, (index % 8) + 2)
        .map(tc => ({
          title: '三级分类' + count++,
          category_id: sc.category_id,
          subcategory_id: index + 1,
          image: images[Math.floor(Math.random() * images.length)],
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
