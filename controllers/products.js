const { Product } = require('../models/');
const { Brand } = require('../models/');
const { Type } = require('../models/');
const { Group } = require('../models/');

const productsController = {};

productsController.getProducts = (req, res, next) => {
    res.render('pages/products/products',
        {
            title: 'Sản phẩm',
        });
}

productsController.edit = (req, res, next) => {
    res.render('pages/products/edit-product',
        { title: 'Cập nhật sản phẩm' });
}

productsController.add = async (req, res, next) => {
    brand = await Brand.findAll({ raw: true });
    type = await Type.findAll({ raw: true });
    group = await Group.findAll({ raw: true });
    res.render('pages/products/add-product',
        {
            title: 'Thêm sản phẩm',
            brand, type, group
        });
}

module.exports = productsController;