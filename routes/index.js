var express = require('express');
var router = express.Router();
const index = require('../controllers/index');

/* GET home page. */
router.get('/', index.authenticationCheck, index.dashboard);

router.get('/login', index.login);

router.post('/login', index.authentication);

router.get('/logout', index.logout);

router.get('/ordersstate', index.ordersState);

router.get('/myprofile', index.myProfile);

router.post('/myprofile', index.updateProfile);

module.exports = router;
