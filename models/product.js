'use strict';

module.exports = (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    price: DataTypes.BIGINT,
    images: DataTypes.ARRAY(DataTypes.STRING),
    quantity: DataTypes.INTEGER,
    views: DataTypes.INTEGER,
    brandId: DataTypes.INTEGER,
    groupId: DataTypes.INTEGER,
    typeId: DataTypes.INTEGER,
  }, {
    freezeTableName: true
  });

  Product.associate = function(models) {
  };
  return Product;
};