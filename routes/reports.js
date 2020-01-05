var express = require('express');
var router = express.Router();
const reports = require('../controllers/reports');

/* GET users listing. */
router.get('/day', reports.getDay);

router.get('/dayananlysis', reports.dayAnalysis);

router.get('/week', reports.getWeek);

router.get('/weekananlysis', reports.weekAnalysis);

router.get('/month', reports.getMonth);

router.get('/monthananlysis', reports.monthAnalysis);

router.get('/quarter', reports.getQuarter);

router.get('/quarterananlysis', reports.quarterAnalysis);

router.get('/year', reports.getYear);

router.get('/yearananlysis', reports.yearAnalysis);

module.exports = router;
