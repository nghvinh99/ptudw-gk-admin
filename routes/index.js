var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('login', { title: 'Đăng nhập' });
});

router.get('/index', function(req, res, next) {
  res.render('index', { title: 'Dashboard' });
});

module.exports = router;
