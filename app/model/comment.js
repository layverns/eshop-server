'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  const Comment = app.model.define(
    'Comment',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      productId: {
        type: INTEGER,
      },
      userId: {
        type: INTEGER,
      },
      specs: {
        type: STRING,
      },
      stars: {
        type: INTEGER,
      },
      text: {
        type: TEXT,
      },
      images: {
        type: TEXT,
      },
    },
    {
      timestamps: true,
    }
  );

  Comment.associate = function() {
    app.model.Comment.belongsTo(app.model.Product, { foreignKey: 'productId', targetKey: 'id', as: 'product' });
    app.model.Comment.belongsTo(app.model.User, { foreignKey: 'userId', targetKey: 'id', as: 'user' });
  };

  return Comment;
};
