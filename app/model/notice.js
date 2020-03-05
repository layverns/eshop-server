'use strict';
module.exports = app => {
  const { STRING, INTEGER, TEXT } = app.Sequelize;

  return app.model.define(
    'Notice',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: STRING,
      },
      subtitle: {
        type: STRING,
      },
      content: {
        type: TEXT,
      },
    },
    {
      timestamps: true,
    }
  );
};
