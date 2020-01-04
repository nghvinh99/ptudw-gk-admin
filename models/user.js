'use strict';

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    block: DataTypes.BOOLEAN,
    name: DataTypes.STRING,
    DoB: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
    avatar: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  User.block = function(id, value) {
    User.update({
      block: value
    }, {
      where: {id : id}
    });
  }

  User.associate = function (models) {
  };
  
  return User;
};
