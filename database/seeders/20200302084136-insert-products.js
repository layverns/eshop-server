'use strict';
const _ = require('lodash');
const { getThirdcategories } = require('./20200301140016-insert-third_categories');
const moment = require('moment');

const products = [
  {
    title: '3秒一杯，超即溶精品咖啡 24颗',
    subtitle: '6种烘焙风格，一盒尽享',
    price: 179,
    old_price: 219,
    images: [
      'https://yanxuan-item.nosdn.127.net/41ceec9f74f2ea5b4e40c92b192f4136.png',
      'https://yanxuan-item.nosdn.127.net/d5d061c6c2ec3fc35220f55a7e48deab.jpg',
      'https://yanxuan-item.nosdn.127.net/ba3518b749e5d8b5dd1ba10e1a9f5e33.jpg',
      'https://yanxuan-item.nosdn.127.net/4d0ae5502b21ef5c832a74441b5c3c42.jpg',
      'https://yanxuan-item.nosdn.127.net/10a65a661aeb27006186f57ace454da4.png',
    ],
    details: [
      {
        title: '品牌属性',
        detail: '本产品为三顿半品牌，由长沙三顿半咖啡有限公司生产制造',
      },
      {
        title: '品名',
        detail: '超即溶精品咖啡',
      },
      {
        title: '规格',
        detail: '3克*24颗',
      },
      {
        title: '配料表',
        detail: '阿拉比卡咖啡粉',
      },
      {
        title: '原产地',
        detail: '江苏省常州市',
      },
      {
        title: '保质期',
        detail: '12个月',
      },
      {
        title: '包装',
        detail: '盒装',
      },
      {
        title: '种类',
        detail: '咖啡',
      },
      {
        title: '贮存条件',
        detail: '请置于阴凉干燥处密封保存',
      },
      {
        title: '温馨提示',
        detail: '网易严选出售的食品，除明确质量问题外均不接受退换货',
      },
    ],
  },
  {
    title: '冬日宅家绝配本命，女式经典法兰绒居家套装',
    subtitle: '安心101%棉 全棉的软糯与柔情',
    price: 119,
    old_price: 219,
    images: [
      'https://yanxuan-item.nosdn.127.net/04e2340099b29daf1bb3b99424c2f6c0.png',
      'https://yanxuan-item.nosdn.127.net/fa838fd7cdd0b7400165fdab60a2c977.png',
      'https://yanxuan-item.nosdn.127.net/94984e061b0f70db73996a15ba2b6a58.png',
      'https://yanxuan-item.nosdn.127.net/3a1a95e025775b999e8a7ce4919b0903.png',
      'https://yanxuan-item.nosdn.127.net/8455c8c3de5aa17c108d79913f56678c.png',
    ],
    details: [
      {
        title: '版型',
        detail: '宽松',
      },
      {
        title: '适用人群',
        detail: '女士',
      },
      {
        title: '适用季节',
        detail: '冬季、秋季',
      },
      {
        title: '尺码',
        detail: 'XL、L、M、S',
      },
      {
        title: '颜色',
        detail: '樱花粉、枫叶红、粉色格纹、灰色格纹',
      },
      {
        title: '风格',
        detail: '居家生活',
      },
      {
        title: '厚度',
        detail: '适中',
      },
      {
        title: '适用场景',
        detail: '居家',
      },
      {
        title: '材质',
        detail: '100%棉',
      },
      {
        title: '服装售后服务',
        detail:
          '非质量问题的退换货，寄回时请保持商品的原始购买状态：内包装完好，吊牌及吊线完好（如有），无磨损，无污渍，无清洗。且不要遗忘任何私人物品于包装中。',
      },
    ],
  },
  {
    title: '炒出家的味道 中华精铁爆炒锅',
    subtitle: '物理不粘无涂层，耐磨耐用',
    price: 259,
    old_price: 300,
    images: [
      'https://yanxuan-item.nosdn.127.net/ca33501c2d6e03bed2dc8e00cf571fdc.png',
      'https://yanxuan-item.nosdn.127.net/fb6b455a6875a5fe1d7eaacdecf6ebc6.jpg',
      'https://yanxuan-item.nosdn.127.net/29ae8a1c93d03a31b4ce2385bef98692.jpg',
      'https://yanxuan-item.nosdn.127.net/6aa6f6817365607a9d96f446a6d22683.jpg',
      'https://yanxuan-item.nosdn.127.net/c89c4c86c6cb31805bd537d8c772a231.png',
    ],
    details: [
      {
        title: '材质',
        detail: '铁',
      },
      {
        title: '不粘涂层',
        detail: '无',
      },
      {
        title: '直径',
        detail: '30cm、33cm',
      },
      {
        title: '电磁炉',
        detail: '不适用',
      },
      {
        title: '锅盖',
        detail: '有',
      },
      {
        title: '适用人数',
        detail: '3-5人',
      },
      {
        title: '套装',
        detail: '否',
      },
      {
        title: '功能',
        detail: '锅具',
      },
      {
        title: '产地',
        detail: '中国大陆',
      },
    ],
  },
  {
    title: '澳洲西拉干红 750毫升',
    subtitle: '新世界经典混酿代表',
    price: 59,
    old_price: 69,
    images: [
      'https://yanxuan-item.nosdn.127.net/88b74c01e5af29d154678b57422eacd1.png',
      'https://yanxuan-item.nosdn.127.net/f8f61b2ced6ed6a72d07a8e74ed7d5ac.jpg',
      'https://yanxuan-item.nosdn.127.net/bb852bf08cabd2fc52135b61f257c3f0.jpg',
      'https://yanxuan-item.nosdn.127.net/ca33501c2d6e03bed2dc8e00cf571fdc.png',
      'https://yanxuan-item.nosdn.127.net/8b32b56df035904598cfb6ffc4cea76c.png',
    ],
    details: [
      {
        title: '品名',
        detail: '富藤山庄干红葡萄酒',
      },
      {
        title: '原产国',
        detail: '澳大利亚',
      },
      {
        title: '规格',
        detail: '750毫升',
      },
      {
        title: '酒精度',
        detail: '14%Vol',
      },
      {
        title: '原料与辅料',
        detail: '葡萄汁，二氧化硫',
      },
      {
        title: '品牌属性',
        detail: '网易严选推荐此品，本产品为富藤山庄品牌，由富藤山庄生产制造',
      },
      {
        title: '温馨提示',
        detail: `1、网易严选出售的食品，除明确质量问题外均不接受退换货。
2、请将产品保存于阴凉、通风、干燥处，开瓶后请尽快饮用。
3、适度饮酒怡情，过度饮酒伤身。
4、注意：饮酒后禁止驾驶机动车。
5、本品不对未成年人出售。`,
      },
    ],
  },
  {
    title: '剪出精致感，金致圆柄复古剪刀',
    subtitle: '轻薄设计，简约大方',
    price: 9.9,
    old_price: 19.9,
    images: [
      'https://yanxuan-item.nosdn.127.net/ade0ec4f0d2d56c723becb8002a69f75.png',
      'https://yanxuan-item.nosdn.127.net/4c6a9c8a579b00e5e9c7b002d15a33a2.jpg',
      'https://yanxuan-item.nosdn.127.net/f832555ef368be44b530dfc4e70e96b8.jpg',
      'https://yanxuan-item.nosdn.127.net/e1c46f4d3ad7c0c4a511214a2756e2fc.jpg',
      'https://yanxuan-item.nosdn.127.net/e52eb92a519a268c4b6c54c4ad2bb95d.png',
    ],
    details: [],
  },
  {
    title: '热豆浆鲜果汁分杯不串味 多功能破壁机',
    subtitle: '高速破壁，彻底释放营养',
    price: 699,
    old_price: 0,
    images: [
      'https://yanxuan-item.nosdn.127.net/000145de66f32a33aa4874585af32cd1.png',
      'https://yanxuan-item.nosdn.127.net/d93c96638754dedc829d8690db73c3fa.jpg',
      'https://yanxuan-item.nosdn.127.net/d8466422e909b42c6824a70c3c43c96c.jpg',
      'https://yanxuan-item.nosdn.127.net/be606e03ed1f7e6c7c5082b6f6749eac.jpg',
      'https://yanxuan-item.nosdn.127.net/6cdb3da46a4b95b36dea89d6d47d3bd9.png',
    ],
    details: [
      {
        title: '种类',
        detail: '西式厨电',
      },
      {
        title: '属性',
        detail: '冷热双杯',
      },
      {
        title: '材料',
        detail: `热杯/玻璃杯： 高硼玻璃
冷杯/果汁杯：TRITAN
刀头： 301不锈钢`,
      },
      {
        title: '容量',
        detail: `玻璃杯： 最大1.75 L ，做热饮建议不超过1.2 L
TRITAN杯： 最大1.75 L，做冷饮建议不超过1.4 L`,
      },
      {
        title: '电压功率',
        detail: `电压： 220V~ 50Hz
功率： 搅拌1000W
加热 800W`,
      },
      {
        title: '转速',
        detail: '25000转/分',
      },
      {
        title: '工作噪音',
        detail: `82分贝左右`,
      },
    ],
  },
  {
    title: '网易智造云感手机保护壳（iPhone系列）',
    subtitle: '日本进口液态硅胶，iPhone手机的舒适感。',
    price: 29,
    old_price: 40,
    images: [
      'https://yanxuan-item.nosdn.127.net/2d6b904324ec63abff04673e98535efe.png',
      'https://yanxuan-item.nosdn.127.net/1d53d199c495ba068701d1d275dd978d.jpg',
      'https://yanxuan-item.nosdn.127.net/f731642df64ed1fae23a1f7b7a06e4d3.jpg',
      'https://yanxuan-item.nosdn.127.net/f4545841dab352ec237fa16ea4d73af4.jpg',
      'https://yanxuan-item.nosdn.127.net/56f91176e5820530411a0e1ac9487f4b.png',
    ],
    details: [
      {
        title: '功能',
        detail: '其他',
      },
      {
        title: '颜色',
        detail: '其他',
      },
      {
        title: '材质',
        detail: `硅胶`,
      },
      {
        title: '厚度',
        detail: `普通`,
      },
      {
        title: '适用场景',
        detail: `其它、休闲、上班、送礼、外出、居家、旅游、日常`,
      },
      {
        title: '适用对象',
        detail: '其他、iPhone Xs Max、iPhone Xr、iPhone Xs、iPhone X、iPhone 7plus/8plus、iPhone 7/8',
      },
      {
        title: '商品清单',
        detail: `手机壳*1，吸塑*1，彩盒*1`,
      },
      {
        title: '注意事项',
        detail: `1、产品下方两角属于产品脆弱部位，注意不可用指甲或锐物直接拆卸；
2、摄像孔为1:1精准孔位，若因加工公差造成的轻微翻边请用指甲压下即可`,
      },
    ],
  },
  {
    title: '网易云音乐 易系列尤克里里 入门款23寸',
    subtitle: '网易云音乐定制 胡桃木/桃花芯二色可选 入门级合板琴 23寸',
    price: 359,
    old_price: 0,
    images: [
      'https://yanxuan-item.nosdn.127.net/748d6326bf5df793303250b58aa6e5eb.png',
      'https://yanxuan-item.nosdn.127.net/2e6d5d6acb2c29aa2964d5a8da0da762.png',
      'https://yanxuan-item.nosdn.127.net/2d71bb76210e626a7f0eddb04277b7c9.png',
      'https://yanxuan-item.nosdn.127.net/aa49a0993a981a2463c3f0f5e888b914.png',
      'https://yanxuan-item.nosdn.127.net/669dba51e7d2cc697333b05ea407a1ed.png',
    ],
    details: [],
  },
];

function getProducts() {
  let count = 1;
  let time = moment().subtract(1, 'days');
  return _.flatten(
    getThirdcategories().map((th, index) =>
      products.map(p => ({
        ...p,
        title: p.title + count++,
        images: JSON.stringify(p.images),
        details: JSON.stringify(p.details),
        third_category_id: index + 1,
        created_at: time.add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
        updated_at: time.add(1, 'seconds').format('YYYY-MM-DD HH:mm:ss.SSSSSS'),
      }))
    )
  );
}

module.exports = {
  getProducts,

  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('products', getProducts());
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('products', null, {});
  },
};
