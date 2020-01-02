'use strict';
module.exports = (sequelize, DataTypes) => {
  const comment = sequelize.define('Comment', {
    userId: DataTypes.INTEGER,
    productId: DataTypes.INTEGER,
    content: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  comment.associate = function(models) {
    // associations can be defined here
  };
  return comment;
};