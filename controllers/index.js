const passport = require('../config/passport');
const { Order } = require('../models/');
const { Product } = require('../models/');
const { Admin } = require('../models/');
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
    if (req.isAuthenticated()) return next();
    res.redirect('/login');
}

indexController.logout = (req, res, next) => {
    req.logout();
    res.redirect('/');
}

indexController.dashboard = async (req, res, next) => {
    const top10 = await Product.findAll({
        raw: true,
        limit: 10,
        order: [
            ['sells', 'DESC']
        ]
    })
    res.render('index', { 
        title: 'Dashboard',
        top10 
    });
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

indexController.myProfile = async (req, res, next) => {
    admin = req.user;
    const date = new Date(admin.DoB);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    res.render('profile', {
        title: 'Cá nhân',
        admin, day, month, year
    })
}

indexController.updateProfile = (req, res, next) => {
    const adminId = req.user.id;
    const info = {
        id: adminId,
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
        DoB: req.body.DoB,
        gender: req.body.gender
    }
    console.log(info);
    console.log(new Date(info.DoB));
    Admin.editInfo(info, (err) => {
        console.log("OK");
        if (err) {
            console.log(err);
        } else res.redirect('/');
    });
}

module.exports = indexController;