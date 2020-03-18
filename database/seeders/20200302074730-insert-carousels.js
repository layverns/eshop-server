'use strict';
const _ = require('lodash');
const { getCategories } = require('./20200301133501-insert-categories');

const homeCarousels = [
  'https://yanxuan.nosdn.127.net/39be8c23bdcf0651d1af56eb4a594730.png',
  'https://yanxuan.nosdn.127.net/17be7a7a4a85d8a999b341c8a7543df6.jpg',
  'https://yanxuan.nosdn.127.net/4299c036cb369202649fee9ed975939a.jpg',
  'https://yanxuan.nosdn.127.net/619dae0493f6cd078a0d7180edc5acef.jpg',
  'https://yanxuan.nosdn.127.net/08f8a5e617252dad8fba1494dab40ff7.jpg',
  'https://yanxuan.nosdn.127.net/34a3285e6003ee67b7dc563569ee0b3b.png',
  'https://yanxuan.nosdn.127.net/218b1ed63fd429821369677638d5297f.jpg',
  'https://yanxuan.nosdn.127.net/990abb066db11b89f462450ab8c71052.jpg',
];

const categoryCarousels = [
  'https://yanxuan.nosdn.127.net/b0c39464f7f579416719ad827788cc43.jpg',
  'https://yanxuan.nosdn.127.net/7ab8a622a3dd132a250a1fea1ea2d819.jpg',
  'https://yanxuan.nosdn.127.net/ae136365d7ac7262135ca53e51293348.jpg',
  'https://yanxuan.nosdn.127.net/84b233d46511af850b4fe99e01c48ed8.jpg',
];

function getCarousels() {
  let homCarousels = homeCarousels.map(c => ({ image: c, category_id: 0 }));
  let catCarousels = _.flatten(getCategories().map((cat, index) => categoryCarousels.map(c => ({ image: c, category_id: index + 1 }))));
  return _.concat(homCarousels, catCarousels);
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('carousels', getCarousels());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('carousels', null, {});
  },
};
