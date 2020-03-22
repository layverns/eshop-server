'use strict';
const _ = require('lodash');
const { getUsers } = require('./20200228091652-insert-users');

const contact = [
  {
    province: 110000,
    city: 110100,
    district: 110101,
    address: '绿地中心c座',
    person: '张顺',
    phone: 13529009392,
    is_default: 1,
  },
  {
    province: 120000,
    city: 120100,
    district: 120101,
    address: '尚东数字谷',
    person: '小夕',
    phone: 13924021392,
  },
];

function getContacts() {
  return _.flatten(
    getUsers().map((u, index) =>
      contact.map(c => ({
        user_id: index + 1,
        ...c,
      }))
    )
  );
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('contacts', getContacts());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('contacts', null, {});
  },
};
