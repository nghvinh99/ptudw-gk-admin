var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('pages/products/products', { title: 'Sản phẩm' });
});

router.get('/edit', function(req, res, next) {
  res.render('pages/products/edit-product', { title: 'Cập nhật sản phẩm' });
});

router.get('/add', function(req, res, next) {
  res.render('pages/products/add-product', { title: 'Thêm sản phẩm' });
});

module.exports = router;
