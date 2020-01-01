'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  Group.add = (name, next) => {
    Group.create({
      name: name
    }).then( () => {
      next(null);
    }).catch((err) => {
      next(err)
    })
  }

  Group.associate = function(models) {
  };
  return Group;
};