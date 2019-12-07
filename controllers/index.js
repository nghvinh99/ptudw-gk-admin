const passport = require('../config/passport');
const { Admin } = require('../models/');

const indexController = {};

indexController.login = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.redirect('/');
    }
    const errors = req.flash().error || [];
    res.render('login',
        {
            title: 'Đăng nhập',
            errors
        });
}

indexController.authentication = passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login',
        failureFlash: true
    })

indexController.authenticationCheck = (req, res, next) => {
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

indexController.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

indexController.dashboard = (req, res, next) => {
    res.render('index', { title: 'Dashboard' });
}

module.exports = indexController;