var express = require('express');
var router = express.Router();
const products = require('../controllers/products');

router.get('/', products.getProducts);

router.get('/getproducts', products.getMoreProducts);

router.get('/edit/:id', products.edit);

router.get('/getbrand', products.getBrand);

router.get('/gettype', products.getType);

router.get('/getgroup', products.getGroup);

router.post('/edit/:id', products.editPost);

router.get('/add', products.add);

router.post('/add', products.upload, products.addPost);

router.get('/delete/:id', products.delete);

module.exports = router;
