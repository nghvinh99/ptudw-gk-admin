'use strict';

module.exports = (sequelize, DataTypes) => {
  const Order = sequelize.define('Order', {
    user: DataTypes.INTEGER,
    detail: DataTypes.TEXT,
    state: DataTypes.STRING,
    name: DataTypes.STRING,
    phone: DataTypes.STRING,
    email: DataTypes.STRING,
    address: DataTypes.STRING,
    note: DataTypes.STRING,
    COD: DataTypes.BOOLEAN,
    cost: DataTypes.BIGINT
  }, {
    freezeTableName: true
  });

  Order.editState = (id, state, next) => {
    Order.update({
      state: state
    }, {
      where: { id : id }
    }).then( () => {
      next();
    })

  }

  Order.associate = function(models) {
  };
  return Order;
};