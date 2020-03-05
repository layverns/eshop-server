'use strict';

const hotWords = ['疫情新快报', '迎春福利满200减30', '先用1年再付费', '随身消毒液', '除菌除螨喷雾'];

function getHotWords() {
  return hotWords.map(h => ({
    keyword: h,
    search_count: Math.random() * 10000,
  }));
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('hot_words', getHotWords());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('hot_words', null, {});
  },
};
