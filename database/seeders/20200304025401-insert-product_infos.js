'use strict';

const product_infos = [
  {
    product: 1,
    prices: JSON.stringify([179]),
    old_prices: JSON.stringify([219]),
    scores: JSON.stringify([17]),
  },
  {
    product: 2,
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
    product: 3,
    prices: JSON.stringify([259, 319]),
    old_prices: JSON.stringify([300, 429]),
    scores: JSON.stringify([25, 31]),
  },
  {
    product: 4,
    prices: JSON.stringify([59, 289]),
    old_prices: JSON.stringify([69, 399]),
    scores: JSON.stringify([5, 28]),
  },
  {
    product: 5,
    prices: JSON.stringify([9.9, 19.9]),
    old_prices: JSON.stringify([19.9, 29.9]),
    scores: JSON.stringify([0, 0]),
  },
  {
    product: 6,
    prices: JSON.stringify([699]),
    old_prices: JSON.stringify([0]),
    scores: JSON.stringify([0]),
  },
  {
    product: 7,
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
    product: 8,
    prices: JSON.stringify([[359, 359]]),
    old_prices: JSON.stringify([[0, 0]]),
    scores: JSON.stringify([[35, 35]]),
  },
];

function getProductInfos() {
  return product_infos;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('product_infos', getProductInfos());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('product_infos', null, {});
  },
};
