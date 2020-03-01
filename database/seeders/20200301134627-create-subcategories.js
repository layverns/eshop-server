'use strict';
const _ = require('lodash');

const subcategories = ['爱家爱生活', '床上用品', '爱家爱生活', '家居饰品', '收纳日用', '厨房用品', '餐具水具', '宠物生活'];

function getSubcategories() {
  return _.flatten(
    Array.from({ length: 8 }).map((v, i) =>
      subcategories.map(s => ({
        category: i + 1,
        title: s,
      }))
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subcategories', getSubcategories());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subcategories', null, {});
  },
};
