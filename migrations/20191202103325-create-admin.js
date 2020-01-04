'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Admin', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING
      },
      name: {
        type: Sequelize.STRING
      },
      DoB: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      gender: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    }).then(() => {
      return queryInterface.bulkInsert('Admin',[{
        username: 'admin',
        password: '$2a$10$DaVC6NFVHp4O/z45FMJW8e0oB2WRIpSJArymSX6vBHeWA1wI.SkSW', //admin
        DoB: '',
        createdAt: new Date(),
        updatedAt: new Date()
      }]);
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Admin');
  }
};