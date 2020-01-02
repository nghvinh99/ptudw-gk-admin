'use strict';
module.exports = (sequelize, DataTypes) => {
  const UserDetail = sequelize.define('UserDetail', {
    name: DataTypes.STRING,
    DoB: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING,
  }, {
    freezeTableName: true
  });
  UserDetail.associate = function(models) {
    // associations can be defined here
  };
  return UserDetail;
};