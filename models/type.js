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
    }).then( () => {
      next(null);
    }).catch((err) => {
      next(err)
    })
  }

  Type.associate = function(models) {
  };
  return Type;
};