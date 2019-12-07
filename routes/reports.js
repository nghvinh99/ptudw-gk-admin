var express = require('express');
var router = express.Router();
const reports = require('../controllers/reports');

/* GET users listing. */
router.get('/day', reports.getDay);

router.get('/week', reports.getWeek);

router.get('/month', reports.getMonth);

router.get('/quarter', reports.getQuarter);

router.get('/year', reports.getYear);

module.exports = router;
