var express = require('express');
var router = express.Router();
const products = require('../controllers/products');

router.get('/', products.getIndex);

router.get('/getproducts', products.getProducts);

router.get('/edit/:id', products.edit);

router.get('/getbrand', products.getBrand);

router.get('/gettype', products.getType);

router.get('/getgroup', products.getGroup);

router.get('/countproducts', products.countProducts);

router.post('/addbrand', products.addBrand);

router.post('/addgroup', products.addGroup);

router.post('/addtype', products.addType);

router.post('/edit/:id', products.editPost);

router.get('/add', products.add);

router.post('/add', products.upload, products.addPost);

router.get('/delete/:id', products.delete);

module.exports = router;
