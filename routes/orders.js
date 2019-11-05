var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('pages/orders/list', { title: 'Đơn hàng' });
});

module.exports = router;
