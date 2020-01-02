'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
    'Brand',
    [
      {
        name: 'Nike',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Addidas',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Dior',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Chanel',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Old Sailor',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Brand', null, {})
};
