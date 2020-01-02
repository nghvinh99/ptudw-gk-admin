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
    }).then( (res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null)
    })
  }

  Group.remove = (id, next) => {
    Group.destroy({
      where: {id:id}
    }).then((res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null);
    })
  }

  Group.associate = function(models) {
  };
  return Group;
};