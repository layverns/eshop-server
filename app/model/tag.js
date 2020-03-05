'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Tag = app.model.define(
    'Tag',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING,
      },
      color: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Tag.associate = function() {
    app.model.Tag.belongsToMany(app.model.Product, { through: app.model.ProductTag, foreignKey: 'tag' });
  };

  return Tag;
};
