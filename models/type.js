'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  Type.add = (name, next) => {
    Type.create({
      name: name
    }).then( (res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null)
    })
  }

  Type.remove = (id, next) => {
    Type.destroy({
      where: {id:id}
    }).then((res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null);
    })
  }

  Type.associate = function(models) {
  };
  return Type;
};