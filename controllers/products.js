const { Product } = require('../models/');
const { Brand } = require('../models/');
const { Type } = require('../models/');
const { Group } = require('../models/');
const fs = require('fs');
const upload = require('../config/multer');
const cloudinary = require('../config/cloudinary');

const productsController = {};

productsController.getIndex = async (req, res, next) => {
    const lastPage = Math.ceil (await Product.count({ raw: true }) / 10);
    res.render('pages/products/products',
        {
            title: 'Sản phẩm',
            lastPage
        });
}

productsController.getBrand = async (req, res, next) => {
    const brand = await Brand.findAll({raw: true});
    res.send(JSON.stringify(brand));
}

productsController.addBrand = (req, res, next) => {
    const name = req.body.name;
    Brand.add(name, (err) => {
        if (err) { 
            res.send(err);
        } else {
            res.end();
        }
    });
}

productsController.getType = async (req, res, next) => {
    const type = await Type.findAll({raw: true});
    res.send(JSON.stringify(type));
}

productsController.addType = (req, res, next) => {
    const name = req.body.name;
    Type.add(name, (err) => {
        if (err) { 
            res.send(err);
        } else {
            res.end();
        }
    });
}

productsController.getGroup = async (req, res, next) => {
    const group = await Group.findAll({raw: true});
    res.send(JSON.stringify(group));
}

productsController.addGroup = (req, res, next) => {
    const name = req.body.name;
    Group.add(name, (err) => {
        if (err) { 
            res.send(err);
        } else {
            res.end();
        }
    });
}

productsController.getProducts = async (req, res, next) => {
    const offset = req.query.page || 1;
    const condition = req.query.condition || {};
    const limit = 10;
    const products = await Product.findAll({
        raw: true,
        where: condition,
        limit: limit,
        offset: (offset-1)*limit,
        order:[
            ['id', 'ASC']
        ]
    });
    res.send(JSON.stringify(products));
}

productsController.countProducts = async (req, res, next) => {
    const condition = req.query.condition || {};
    const count = Math.ceil (await Product.count({ where: condition}) / 10);
    res.send(JSON.stringify(count));
}

productsController.edit = async (req, res, next) => {
    const id = req.params.id;

    const product = await Product.findOne({
        where: { id: id },
        raw: true
    });

    const pInfo = {
        brand : await Brand.findOne({ where: { id: product.brandId } }),
        type : await Type.findOne({ where: { id: product.typeId } }),
        group : await Group.findOne({ where: { id: product.groupId } }),
    }
    
    const brand = await Brand.findAll({ raw: true });
    const type = await Type.findAll({ raw: true });
    const group = await Group.findAll({ raw: true });

    res.render('pages/products/edit-product',
        {
            title: 'Cập nhật sản phẩm',
            product, brand, type, group, pInfo
        });
}

productsController.editPost = (req, res, next) => {
    const info = {
        id : req.params.id,
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        brand : req.body.brand,
        group : req.body.group,
        type : req.body.type,
    }
    Product.edit(info, () => {
        res.redirect('/products');
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

productsController.upload = upload.array('productImage', 4);

productsController.addPost = async (req, res, next) => {
    const info = {
        name : req.body.name,
        price : req.body.price,
        quantity : req.body.quantity,
        group : req.body.group,
        type : req.body.type,
        brand : req.body.brand,
        URLs : [],
    }

    for (let file of req.files) {
        const cloudPath = await cloudinary.uploads(file.path);
        info.URLs.push(cloudPath.url);
        fs.unlinkSync(file.path);
    }

    Product.add(info, () => {
        res.redirect('/products');
    });
}

productsController.delete = (req, res, next) => {
    const id = req.params.id;
    Product.destroy({ 
        where: { id: id }
    });
    res.redirect('/products');
}

module.exports = productsController;