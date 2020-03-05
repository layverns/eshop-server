'use strict';

const tags = [
  {
    title: '满88顺丰包邮',
    color: '#F28F2D',
  },
  {
    title: '顺丰配送',
    color: '#F28F2D',
  },
  {
    title: '满249元花呗3期免息',
    color: '#F28F2D',
  },
  {
    title: '限时购',
    color: '#e36844',
  },
  {
    title: '新人特价包邮',
    color: '#e36844',
  },
];

function getTags() {
  return tags;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('tags', getTags());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('tags', null, {});
  },
};
