var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require('../models/');

passport.use(new LocalStrategy({ passReqToCallback : true },
  function (req, username, password, done) {
    Admin.findOne({ where: { username: username } })
      .then(admin => {
        if (!admin) {
          return done(null, false, req.flash('error', 'Tài khoản không tồn tại'));
        }
        admin.validPassword(password, (err, res) => {
          if (!res) {
            return done(null, false, req.flash('error', 'Sai mật khẩu'));
          } else {
            return done(null, admin);
          }
        })
      })
  })
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser((id, done) => {
  Admin.findByPk(id)
  .then ((admin) => {
    if (admin) {
      return done(null, admin);
    } else {
      return done(null, false);
    }
  })
});

authenticationCheck = function() {
  return (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
  }
}

module.exports = passport;