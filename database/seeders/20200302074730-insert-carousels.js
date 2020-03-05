'use strict';
const _ = require('lodash');

const carousels = [
  'https://yanxuan.nosdn.127.net/17be7a7a4a85d8a999b341c8a7543df6.jpg',
  'https://yanxuan.nosdn.127.net/4299c036cb369202649fee9ed975939a.jpg',
  'https://yanxuan.nosdn.127.net/619dae0493f6cd078a0d7180edc5acef.jpg',
  'https://yanxuan.nosdn.127.net/08f8a5e617252dad8fba1494dab40ff7.jpg',
  'https://yanxuan.nosdn.127.net/34a3285e6003ee67b7dc563569ee0b3b.png',
  'https://yanxuan.nosdn.127.net/218b1ed63fd429821369677638d5297f.jpg',
  'https://yanxuan.nosdn.127.net/990abb066db11b89f462450ab8c71052.jpg',
];

function getCarousels() {
  return carousels.map(c => ({
    image: c,
  }));
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('carousels', getCarousels());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('carousels', null, {});
  },
};
