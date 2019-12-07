'use strict';
module.exports = (sequelize, DataTypes) => {
  const Type = sequelize.define('Type', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Type.associate = function(models) {
  };
  return Type;
};