const { Product } = require('../models/');
const { Brand } = require('../models/');
const { Type } = require('../models/');
const { Group } = require('../models/');
const upload = require('../config/multer');
const productsController = {};

productsController.getProducts = async (req, res, next) => {
    const products = await Product.findAll({ raw: true });
    const brand = await Brand.findAll({ raw: true });
    const type = await Type.findAll({ raw: true });
    const group = await Group.findAll({ raw: true });
    res.render('pages/products/products',
        {
            title: 'Sản phẩm',
            products, brand, type, group
        });
}

productsController.edit = async (req, res, next) => {
    const id = req.params.id;
    const product = await Product.findOne({
        where: { id: id },
        raw: true
    });
    const pBrand = await Brand.findOne({ where: { id: product.brandId } });
    const pType = await Type.findOne({ where: { id: product.typeId } });
    const pGroup = await Group.findOne({ where: { id: product.groupId } });
    const pInfo = { brand: pBrand, type: pType, group: pGroup };
    const brand = await Brand.findAll({ raw: true });
    const type = await Type.findAll({ raw: true });
    const group = await Group.findAll({ raw: true });
    res.render('pages/products/edit-product',
        {
            title: 'Cập nhật sản phẩm',
            product, brand, type, group, pInfo
        });
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

productsController.upload = upload.single('productImage');

productsController.addPost = (req, res, next) => {
    const name = req.body.name;
    const price = req.body.price;
    const quantity = req.body.quantity;
    const group = req.body.group;
    const type = req.body.type;
    const brand = req.body.brand;
    console.log(name+"__"+price+"__"+quantity+"__"+group+"__"+type+"__"+brand);
    console.log(req.file);
    Product.create({
        name: name,
        price: price,
        images: [ 'http://localhost:3000/images/upload/productImage_1575897478616_layout_2.PNG' ],
        quantity: quantity,
        views: '0',
        brandId: brand,
        groupId: group,
        typeId: type
    });
    res.redirect('/products');
    
}

productsController.delete = (req, res, next) => {
    const id = req.params.id;
    Product.destroy({ where: { id: id }, paranoid: true });
    res.redirect('/products');
}

module.exports = productsController;