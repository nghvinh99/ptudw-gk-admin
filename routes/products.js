var express = require('express');
var router = express.Router();
const products = require('../controllers/products');

/* GET users listing. */
router.get('/', products.getProducts);

router.get('/edit/:id', products.edit);

router.get('/add', products.add);

router.post('/add', products.upload, products.addPost);

router.get('/delete/:id', products.delete);

module.exports = router;
