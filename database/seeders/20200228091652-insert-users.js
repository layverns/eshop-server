'use strict';
const bcrypt = require('bcrypt');

const users = [
  {
    username: 'apple',
    email: 'apple@demo.com',
    image: 'https://static.easyicon.net/preview/122/1229035.gif',
  },
  {
    username: 'jack',
    email: 'jack@demo.com',
    image: 'https://static.easyicon.net/preview/114/1141230.gif',
  },
  {
    username: 'tom',
    email: 'tom@demo.com',
    image: 'https://static.easyicon.net/preview/120/1202943.gif',
  },
  {
    username: 'mary',
    email: 'mary@demo.com',
    image: 'https://static.easyicon.net/preview/120/1202944.gif',
  },
  {
    username: 'sara',
    email: 'sara@demo.com',
    image: 'https://static.easyicon.net/preview/58/583766.gif',
  },
];

function getUsers() {
  return users.map(u => {
    return {
      ...u,
      password: bcrypt.hashSync('123456x', 10),
    };
  });
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('users', getUsers());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
