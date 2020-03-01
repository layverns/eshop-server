'use strict';
module.exports = app => {
  const { STRING, INTEGER } = app.Sequelize;

  return app.model.define(
    'hot_words',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      keyword: {
        type: STRING,
      },
      searchCount: {
        type: INTEGER,
        field: 'search_count',
      },
    },
    {
      timestamps: true,
    }
  );
};
