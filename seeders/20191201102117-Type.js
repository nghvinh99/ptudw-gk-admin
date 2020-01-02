'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
      'Type',
      [
        {
          name: 'Áo thun',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Váy',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Áo khoác',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Áo sơ mi',
          createdAt: new Date(),
          updatedAt: new Date()
        },
        {
          name: 'Giày',
          createdAt: new Date(),
          updatedAt: new Date()
        },
      ],
      {},
    ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Type', null, {})
};
