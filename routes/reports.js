var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/day', function(req, res, next) {
  res.render('pages/reports/day', { title: 'Thống kê ngày' });
});

router.get('/week', function(req, res, next) {
  res.render('pages/reports/week', { title: 'Thống kê tuần' });
});

router.get('/month', function(req, res, next) {
  res.render('pages/reports/month', { title: 'Thống kê tháng' });
});

router.get('/quarter', function(req, res, next) {
  res.render('pages/reports/quarter', { title: 'Thống kê quý' });
});

router.get('/year', function(req, res, next) {
  res.render('pages/reports/year', { title: 'Thống kê năm' });
});

module.exports = router;
