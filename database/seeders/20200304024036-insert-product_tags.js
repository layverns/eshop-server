'use strict';

const product_tag = [
  {
    product: 1,
    tag: 2,
  },
  {
    product: 2,
    tag: 1,
  },
  {
    product: 3,
    tag: 3,
  },
  {
    product: 4,
    tag: 1,
  },
  {
    product: 4,
    tag: 3,
  },
  {
    product: 5,
    tag: 1,
  },
  {
    product: 6,
    tag: 1,
  },
  {
    product: 6,
    tag: 3,
  },
  {
    product: 7,
    tag: 1,
  },
  {
    product: 8,
    tag: 3,
  },
];

function getProductTag() {
  return product_tag;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_tags', getProductTag());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_tags', null, {});
  },
};
