var express = require('express');
var router = express.Router();
const index = require('../controllers/index');

/* GET home page. */
router.get('/login', index.login);

router.post('/login', index.authentication);

router.get('/logout', index.logout);

router.get('/', index.authenticationCheck, index.dashboard);

module.exports = router;
