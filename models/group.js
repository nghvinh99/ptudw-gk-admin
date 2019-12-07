'use strict';
module.exports = (sequelize, DataTypes) => {
  const Group = sequelize.define('Group', {
    name: DataTypes.STRING
  }, {
    freezeTableName: true
  });
  Group.associate = function(models) {
  };
  return Group;
};