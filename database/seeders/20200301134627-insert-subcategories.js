'use strict';
const _ = require('lodash');

const subcategories = [
  ['爱家爱生活', '床上用品', '家居饰品', '收纳日用', '厨房用品', '餐具水具', '宠物生活'],
  ['当季热销', '男装', '女装', '居家内衣', '鞋靴', '箱包', '首饰配件', '系列特辑'],
  ['超值美食推荐', '休闲零食', '坚果蜜饯', '冲饮茗茶', '滋补保健', '酒水饮料', '粮油调味', '生鲜特色'],
  ['好物精选', '面部护理', '个人护理', '彩妆香水', '个护电器', '纸品清洁', '家清卫浴', '成人用品'],
  ['婴童精选', '童装', '童鞋', '洗护喂养', '婴童寝居', '童包出行', '玩具图书', '孕产妈咪'],
  ['当季热销', '男子运动', '女子运动', '旅行用品', '户外露营', '运动健身', '运动配件'],
  ['好货精选', '生活电器', '个护电器', '按摩电器', '厨房电器', '智能生活', '数码办公', '影音娱乐'],
  ['好货精选', '进口居家', '进口洗护', '全球配饰', '进口饮食', '特色品牌馆', '图书文娱', '周边商品'],
];

function getSubcategories() {
  return _.flatten(subcategories.map((arr, index) => arr.map(s => ({ title: s, category_id: index + 1 }))));
}

module.exports = {
  getSubcategories,

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('subcategories', getSubcategories());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('subcategories', null, {});
  },
};
