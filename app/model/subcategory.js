'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  const Subcategory = app.model.define(
    'Subcategory',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: INTEGER,
      },
      title: {
        type: STRING,
      },
    },
    {
      timestamps: true,
    }
  );

  Subcategory.associate = function() {
    app.model.Subcategory.belongsTo(app.model.Category, { foreignKey: 'category', targetKey: 'id' });
    app.model.Subcategory.hasMany(app.model.ThirdCategory, { foreignKey: 'subcategory', sourceKey: 'id' });
  };

  return Subcategory;
};
