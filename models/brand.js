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
    }).then( (res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null)
    })
  }

  Brand.remove = (id, next) => {
    Brand.destroy({
      where: {id:id}
    }).then((res) => {
      next(null, res);
    }).catch((err) => {
      next(err, null);
    })
  }

  Brand.associate = function(models) {
  };
  return Brand;
};