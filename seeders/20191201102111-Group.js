'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => 
    queryInterface.bulkInsert(
      'Group',
      [
        {
          name: 'Thời trang nam',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Thời trang nữ',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Thời trang unisex',
          createdAt: new Date(),
          updatedAt: new Date()
        }
      ],
      {},
    ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Group', null, {})
};
