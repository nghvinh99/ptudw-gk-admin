var express = require('express');
var router = express.Router();
const orders = require('../controllers/orders');

/* GET home page. */
router.get('/', orders.getOrders);

module.exports = router;
