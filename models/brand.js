'use strict';
module.exports = (sequelize, DataTypes) => {
  const Brand = sequelize.define('Brand', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });

  Brand.add = (name, next) => {
    Brand.create({
      name: name
    }).then( () => {
      next(null);
    }).catch((err) => {
      next(err)
    })
  }

  Brand.associate = function(models) {
  };
  return Brand;
};