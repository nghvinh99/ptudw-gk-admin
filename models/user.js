'use strict';
const bcrypt = require('bcryptjs');
const saltRound = 10;

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    block: DataTypes.BOOLEAN
  }, {
    freezeTableName: true
  });

  User.prototype.register = function(username, password, redirect) {
    bcrypt.hash(password, saltRound, (err, hash) => {
      User.create({
        username: username,
        password: hash,
        block: false
      }).then (user => redirect(null, user))
      .catch (err => redirect(err, null))
    });
  };

  User.prototype.validPassword = function(password, done) {
    bcrypt.compare(password, this.password, (err, res) => {
      return done(err, res);
    });
  };

  User.associate = function (models) {
  };
  
  return User;
};
