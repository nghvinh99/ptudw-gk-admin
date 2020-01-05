'use strict';
const bcrypt = require('bcryptjs');
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    name: DataTypes.STRING,
    DoB: DataTypes.DATE,
    email: DataTypes.STRING,
    phone: DataTypes.STRING,
    gender: DataTypes.BOOLEAN,
  }, {
    freezeTableName: true
  });

  Admin.editInfo = async (info, next) => {
    Admin.update({
      name: info.name,
      email: info.email,
      phone: info.phone,
      DoB: new Date(info.DoB),
      gender: info.gender
    }, {
      where: {id: info.id}
    }).then(() => {
      next(null);
    }).catch((err) => {
      next(err);
    })
  }

  Admin.prototype.validPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, res) => {
      return done(err, res);
    });
  };

  Admin.associate = function(models) {
  };
  return Admin;
};