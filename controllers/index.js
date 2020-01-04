const passport = require('../config/passport');
const { Order } = require('../models/');
const Sequelize = require('sequelize');
const Op = Sequelize.Op

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
    next();
    // if (req.isAuthenticated()) return next();
    // res.redirect('/login');
}

indexController.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

indexController.dashboard = (req, res, next) => {
    res.render('index', { title: 'Dashboard' });
}

indexController.ordersState = async (req, res, next) => {
    const Pending = await Order.count({where: { state: "Pending" }});
    const Delivering = await Order.count({where: { state: "Delivering" }});
    const Delivered = await Order.count({where: { state: "Delivered" }});
    const orders = {
        Pending, Delivering, Delivered
    }
    res.send(JSON.stringify(orders));
}

indexController.todayIncome = async (req, res, next) => {
    const date = new Date();
    console.log(date);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    console.log(date);
    const d = new Date();
    d.setHours(23);
    d.setMinutes(59);
    d.setSeconds(58);
    console.log(d);
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [date, d]
            }
        },
        attributes: ['cost']
    })
    console.log(order);
    res.end();
}

module.exports = indexController;