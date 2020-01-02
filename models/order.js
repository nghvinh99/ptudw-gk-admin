'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user: DataTypes.INTEGER,
    order: DataTypes.INTEGER
  }, {
    freezeTableName: true
  });

  Order.add = (user, order) => {
    Order.create({
      user: user.id,
      order: order.id
    })
  }

  Order.associate = function(models) {
  };
  return Order;
};