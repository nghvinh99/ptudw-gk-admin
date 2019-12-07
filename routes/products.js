var express = require('express');
var router = express.Router();
const products = require('../controllers/products');

/* GET users listing. */
router.get('/', products.getProducts);

router.get('/edit', products.edit);

router.get('/add', products.add);

module.exports = router;
