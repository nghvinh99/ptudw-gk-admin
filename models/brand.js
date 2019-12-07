'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Brand.associate = function(models) {
  };
  return Brand;
};