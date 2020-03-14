'use strict';
module.exports = app => {
  const { STRING, INTEGER, BOOLEAN } = app.Sequelize;

  const Contact = app.model.define(
    'Contact',
    {
      id: {
        type: INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user: {
        type: INTEGER,
      },
      province: {
        type: STRING,
      },
      city: {
        type: STRING,
      },
      district: {
        type: STRING,
      },
      address: {
        type: STRING,
      },
      person: {
        type: STRING,
      },
      phone: {
        type: STRING,
      },
      isDefault: {
        type: BOOLEAN,
        defaultValue: false,
      },
    },
    {
      timestamps: true,
    }
  );

  return Contact;
};
