'use strict';
const notices = [
  {
    title: '关于购物返回馈金活动暂停的公告',
    subtitle: '时间：2020-02-14 19:00:03',
    content: `
尊敬的网易严选用户，

您好。

网易严选平台上的回馈金返现活动即将于2020年2月20日24时暂停。


回馈金返现活动于2019年4月11日，网易严选3周年之际，作为业内首创运营玩法正式推出；一经推出，倍受消费者欢迎；因此，我们决定顺应消费意愿，拉长回馈金返现活动的运营时长。

在即将迎来网易严选4周年之际，回馈金返现活动将正式暂停；届时，我们将推出新的运营活动，回馈广大消费者，还请留意页面详情。

如您帐户内尚有留存的回馈金，仍可照常使用。

如有任何疑问，请致电客服热线：400-0368-163或联系在线客服。

网易严选祝您购物愉快。`,
  },
];

function getNotices() {
  return notices;
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('notices', getNotices());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('notices', null, {});
  },
};
