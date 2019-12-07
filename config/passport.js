var passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const { Admin } = require('../models/');

passport.use(new LocalStrategy({ passReqToCallback : true },
  function (req, username, password, done) {
    Admin.findOne({ where: { username: username } })
      .then(admin => {
        if (!admin) {
          return done(null, false, req.flash('error', 'Tài khoản hoặc mật khẩu không hợp lệ'));
        }
        admin.validPassword(password, (err, res) => {
          if (!res) {
            return done(null, false, req.flash('error', 'Tài khoản hoặc mật khẩu không hợp lệ'));
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

module.exports = passport;