var express = require('express');
var router = express.Router();
const passport = require('../config/passport');
const { Admin } = require('../models/');

/* GET home page. */
router.get('/login', function (req, res, next) {
  if (req.isAuthenticated()) {
    res.redirect('/');
  }
  const errors = req.flash().error || [];
  res.render('login',
    {
      title: 'Đăng nhập',
      errors
    });
});

router.post('/login', passport.authenticate('local',
  {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true
  })
);

router.get('/logout', function (req, res, next) {
  req.logout();
  res.redirect('/');
});

router.get('/',
  authenticationCheck(),
  function (req, res, next) {
    res.render('index',
      { title: 'Dashboard' });
  }
);

module.exports = router;
