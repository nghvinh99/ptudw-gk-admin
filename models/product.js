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

  Product.edit = (info, next) => {
    Product.update({
      name: info.name,
      price: info.price,
      quantity: info.quantity,
      brandId: info.brand,
      typeId: info.type,
      groupId: info.group
    }, {
      where: { id : info.id }
    }).then( () => {
      next();
    })
  }

  Product.add = (info, next) => {
    Product.create({
      name: info.name,
      price: info.price,
      images: info.URLs,
      quantity: info.quantity,
      views: '0',
      brandId: info.brand,
      groupId: info.group,
      typeId: info.type
  }).then( () => {
    next();
  })
  }

  Product.associate = function(models) {
  };
  return Product;
};