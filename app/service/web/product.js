'use strict';

const Service = require('egg').Service;
const _ = require('lodash');
const camelcaseKeys = require('camelcase-keys');

const { ERRORS, ServerError } = require('../../libs/errors');

class ProductService extends Service {
  async search({ keyword, offset, limit, sort, order, categoryId }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let options = {
      raw: true,
      limit,
      offset,
      order: [[sort, order]],
      where: {},
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
          [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
          [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
        ],
      },
    };

    if (!_.isEmpty(keyword)) {
      options.where['title'] = { [Sequelize.Op.like]: `%${keyword}%` };
    }

    if (!_.isEmpty(categoryId)) {
      let subcategories = await ctx.model.Subcategory.findAll({ where: { categoryId } });
      let subcategoryIds = subcategories.map(sc => sc.id);
      let thirdCategories = await ctx.model.ThirdCategory.findAll({
        where: { subcategoryId: { [Sequelize.Op.in]: subcategoryIds } },
      });
      let thirdCategoryIds = thirdCategories.map(tc => tc.id);
      options.where['thirdCategoryId'] = { [Sequelize.Op.in]: thirdCategoryIds };
    }

    let productCount = await ctx.model.Product.count({ where: options.where });
    let products = await ctx.model.Product.findAll(options);

    let allProducts = await ctx.model.Product.findAll({
      raw: true,
      where: _.omit(options.where, 'thirdCategoryId'),
      attributes: ['thirdCategoryId'],
    });
    let thirdCategoryIds = _.uniq(allProducts.map(p => p.thirdCategoryId));

    let thirdCategories = await ctx.model.ThirdCategory.findAll({
      where: {
        id: { [Sequelize.Op.in]: thirdCategoryIds },
      },
      include: [
        {
          model: ctx.model.Subcategory,
          as: 'subcategory',
          include: [
            {
              model: ctx.model.Category,
              as: 'category',
            },
          ],
        },
      ],
    });
    let categories = _.uniqBy(
      thirdCategories.map(tc => tc.subcategory.category.get({ plain: true })),
      c => c.id
    );

    products = await Promise.all(
      products.map(async p => {
        let tags = await ctx.model.Tag.findAll({
          raw: true,
          include: [
            {
              model: ctx.model.Product,
              where: {
                id: p.id,
              },
              attributes: [],
            },
          ],
          attributes: ['id', 'title', 'color'],
        });

        return {
          ...p,
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return { products, productCount, categories };
  }

  async getDetail({ id }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let product = null;
    let thirdCategory = null;
    let subcategory = null;
    let category = null;
    let productInfo = null;
    let tags = null;
    let productSpecs = null;

    product = await ctx.model.Product.findOne({
      raw: true,
      where: { id },
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
          [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
          [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
        ],
      },
    });
    if (_.isEmpty(product)) {
      throw new ServerError('没有该产品信息!', ERRORS.VALIDATION.CODE);
    }

    thirdCategory = await ctx.model.ThirdCategory.findOne({
      raw: true,
      where: {
        id: product.thirdCategoryId,
      },
      attributes: ['id', 'title', 'subcategoryId'],
    });

    if (!_.isEmpty(thirdCategory)) {
      subcategory = await ctx.model.Subcategory.findOne({
        raw: true,
        where: {
          id: thirdCategory.subcategoryId,
        },
        attributes: ['id', 'title', 'categoryId'],
      });

      if (!_.isEmpty(subcategory)) {
        category = await ctx.model.Category.findOne({
          raw: true,
          where: {
            id: subcategory.categoryId,
          },
          attributes: ['id', 'title'],
        });
      }
    }

    productInfo = await ctx.model.ProductInfo.findOne({
      raw: true,
      where: {
        productId: id,
      },
      attributes: ['id', 'prices', 'oldPrices', 'scores'],
    });

    if (!_.isEmpty(productInfo)) {
      productInfo = {
        id: productInfo.id,
        prices: JSON.parse(productInfo.prices),
        oldPrices: JSON.parse(productInfo.oldPrices),
        scores: JSON.parse(productInfo.scores),
      };
    }

    tags = await ctx.model.Tag.findAll({
      raw: true,
      include: [
        {
          model: ctx.model.Product,
          where: {
            id: id,
          },
          attributes: [],
        },
      ],
      attributes: ['id', 'title', 'color'],
    });

    tags = tags && tags.map(t => _.pick(t, ['id', 'title', 'color']));

    productSpecs = await ctx.model.ProductSpec.findAll({
      raw: true,
      where: {
        productId: id,
      },
      attributes: ['id', 'spec', 'title', 'image', 'order', 'index'],
    });

    if (!_.isEmpty(productSpecs)) {
      productSpecs = _.groupBy(productSpecs, ps => ps.spec);
      productSpecs = Object.keys(productSpecs).map(k => productSpecs[k]);
    }

    return {
      ...product,
      details: JSON.parse(product.details),
      category,
      subcategory,
      thirdCategory,
      tags,
      productSpecs,
      productInfo,
    };
  }

  async getList({ thirdCategoryId }, { limit, offset }) {
    const { ctx } = this;
    const { Sequelize } = ctx.app;

    let options = {
      raw: true,
      order: [['created_at', 'desc']],
      limit,
      offset,
      attributes: {
        include: [
          [Sequelize.cast(Sequelize.col('price'), 'double'), 'price'],
          [Sequelize.cast(Sequelize.col('old_price'), 'double'), 'oldPrice'],
          [Sequelize.cast(Sequelize.col('images'), 'json'), 'images'],
        ],
      },
    };

    if (thirdCategoryId) {
      options.where = {
        thirdCategoryId,
      };
    }

    let products = await ctx.model.Product.findAll(options);

    products = await Promise.all(
      products.map(async p => {
        let tags = await ctx.model.Tag.findAll({
          raw: true,
          include: [
            {
              model: ctx.model.Product,
              where: {
                id: p.id,
              },
              attributes: [],
            },
          ],
          attributes: ['id', 'title', 'color'],
        });

        return {
          ...p,
          tags: tags.map(t => _.pick(t, ['id', 'title', 'color'])),
        };
      })
    );

    return products;
  }

  async getCommentList(where, { offset, limit }) {
    const { ctx } = this;

    let comments = await ctx.model.Comment.findAll({
      limit,
      offset,
      where,
      attributes: ['id', 'productId', 'specs', 'stars', 'text', 'images', 'createdAt'],
      include: [
        {
          model: ctx.model.User,
          as: 'user',
          attributes: ['id', 'username', 'email', 'image'],
        },
      ],
    });

    return comments.map(c => ({ ...c.get({ plain: true }), images: JSON.parse(c.get('images')) }));
  }

  async getCommentInfo(where) {
    const { ctx } = this;

    let commentCount = await ctx.model.Comment.count({
      where,
    });
    let sum = await ctx.model.Comment.sum('stars', {
      where,
    });

    return { commentCount, commentAvgStars: sum / commentCount };
  }
}

module.exports = ProductService;
