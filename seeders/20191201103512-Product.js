'use strict';

module.exports = {
  up: (queryInterface, Sequelize) =>
    queryInterface.bulkInsert(
    'Product',
    [
      {
        name: 'Áo thun đá bóng',
        price: 100000,
        images:  ['/images/category/category_2.png'],
        quantity: 50,
        views: 0,
        brandId: 2,
        groupId: 3,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy đen',
        price: 350000,
        images: ['/images/category/category_4.png'],
        quantity: 50,
        views: 0,
        brandId: 4,
        groupId: 2,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Áo thun giả bộ đội',
        price: 200000,
        images: ['/images/category/category_6.png'],
        quantity: 50,
        views: 0,
        brandId: 5,
        groupId: 1,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Áo thun tay dài',
        price: 150000,
        images: ['/images/category/category_5.png'],
        quantity: 50,
        views: 0,
        brandId: 5,
        groupId: 3,
        typeId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy lam',
        price: 260000,
        images: ['/images/category/category_7.png'],
        quantity: 50,
        views: 0,
        brandId: 3,
        groupId: 2,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Áo khoác jean',
        price: 250000,
        images: ['/images/category/category_8.png'],
        quantity: 50,
        views: 0,
        brandId: 5,
        groupId: 3,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Giày Nike',
        price: 500000,
        images: ['/images/category/category_9.png'],
        quantity: 50,
        views: 0,
        brandId: 1,
        groupId: 3,
        typeId: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy đa sắc',
        price: 280000,
        images: ['/images/category/category_10.png'],
        quantity: 50,
        views: 0,
        brandId: 5,
        groupId: 2,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy đen bó',
        price: 320000,
        images: ['/images/category/category_11.png'],
        quantity: 50,
        views: 0,
        brandId: 4,
        groupId: 2,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Váy trắng',
        price: 340000,
        images: ['/images/category/category_1.png'],
        quantity: 50,
        views: 0,
        brandId: 3,
        groupId: 2,
        typeId: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Khoác jean denim',
        price: 230000,
        images: ['/images/category/category_12.png'],
        quantity: 50,
        views: 0,
        brandId: 2,
        groupId: 1,
        typeId: 3,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        name: 'Áo sơ mi caro Hàn Quốc',
        price: 250000,
        images: ['/images/category/category_3.png'],
        quantity: 50,
        views: 0,
        brandId: 5,
        groupId: 2,
        typeId: 4,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ],
    {},
  ),
  down: (queryInterface, Sequelize) => queryInterface.bulkDelete('Product', null, {})
};
