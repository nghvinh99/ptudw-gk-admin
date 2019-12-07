var express = require('express');
var router = express.Router();
const users = require('../controllers/users');

/* GET users listing. */
router.get('/', users.getUsers);

module.exports = router;
