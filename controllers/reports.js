const { Order } = require('../models/');
const sequelize = require('sequelize');
const Op = sequelize.Op;

const reportsController = {};

let years = [];
for (i = new Date().getFullYear(); i > 1900; i--) {
    years.push(i);
}

reportsController.getDay = (req, res, next) => {
    res.render('pages/reports/day',
        { title: 'Thống kê ngày' });
}

reportsController.dayAnalysis = async (req, res, next) => {
    const start = new Date(req.query.date);
    const end = new Date(start.getTime() + 24 * 60 * 60 *1000);
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [start, end]
            },
            state: 'Delivered'
        },
    });

    let labels = [];
    for (let i=0;i<order.length;i++) {
        labels[i] = (i+1);
    }
    const dataset = [];

    for (let i=0;i<order.length;i++) {
            dataset.push(parseInt(order[i].cost));
    }
    const data = {
        labels, dataset
    }
    res.send(JSON.stringify(data));
}


reportsController.getWeek = (req, res, next) => {
    res.render('pages/reports/week',
        { title: 'Thống kê tuần' });
}

reportsController.weekAnalysis = async (req, res, next) => {
    const start = new Date(req.query.date);
    const end = new Date(start.getTime() + (6 * 24 * 60 * 60 *1000));
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [start, end]
            },
            state: 'Delivered'
        },
    });
    const dayOfWeek = ['Chủ nhật', 'Thứ hai', 'Thứ ba', 'Thứ tư', 'Thứ năm',
                        'Thứ sáu', 'Thứ bảy'];
    let weekPointer = start.getDay();
    let labels = [];
    for (let i=0;i<7;i++) {
        labels[i] = dayOfWeek[weekPointer];
        weekPointer = parseInt(weekPointer + 1) % 7;
    }
    const dataset = [];
    const orderCount = [];

    weekPointer = start.getDate();
    for (let i=0;i<labels.length;i++) {
        let sum = 0;
        let orders = 0;
        for (let j=0;j<order.length;j++)
            if (order[j].updatedAt.getDate() == weekPointer) {
                sum += parseInt(order[j].cost);
                orders += 1;
            }
        dataset.push(sum);
        orderCount.push(orders);
        weekPointer += 1;
    }
    const data = {
        labels, dataset, orderCount
    }
    res.send(JSON.stringify(data));
}

reportsController.getMonth = (req, res, next) => {
    res.render('pages/reports/month',
        { title: 'Thống kê tháng', years });
}

reportsController.monthAnalysis = async (req, res, next) => {
    const year = req.query.year;
    const month = parseInt(req.query.month);
    const start = new Date(year, month, 1, 0, 0, 0, 0);
    const end = new Date(year, (month+1), 0, 24, 0, 0, 0);
    const gaps = (end.getTime() - start.getTime()) / (1000 * 3600 * 24);
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [start, end]
            },
            state: 'Delivered'
        },
    });
    
    let labels = [];
    for (let i=0;i<gaps;i++) {
        labels[i] = (i+1);
    }
    const dataset = [];
    const orderCount = [];

    for (let i=0;i<labels.length;i++) {
        let sum = 0;
        let orders = 0;
        for (let j=0;j<order.length;j++)
            if (order[j].updatedAt.getDate() == (i+1)) {
                sum += parseInt(order[j].cost);
                orders += 1;
            }
        dataset.push(sum);
        orderCount.push(orders);
    }
    const data = {
        labels, dataset, orderCount
    }
    res.send(JSON.stringify(data));
}

reportsController.getQuarter = (req, res, next) => {
    res.render('pages/reports/quarter',
        { title: 'Thống kê quý', years });
}

reportsController.quarterAnalysis = async (req, res, next) => {
    const year = req.query.year;
    const quarter = parseInt(req.query.quarter);
    const month = (quarter * 3) + 1;
    const start = new Date(year, (month-1), 1, 0, 0, 0, 0);
    const end = new Date(year, (month+2), 0, 24, 0, 0, 0);
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [start, end]
            },
            state: 'Delivered'
        },
    });

    let labels = [];
    for (let i=0;i<3;i++) {
        labels[i] = (month+i);
    }
    const dataset = [];
    const orderCount = [];

    for (let i=0;i<labels.length;i++) {
        let sum = 0;
        let orders = 0;
        for (let j=0;j<order.length;j++)
            if (order[j].updatedAt.getMonth() == (labels[i]-1)) {
                sum += parseInt(order[j].cost);
                orders += 1;
            }
        dataset.push(sum);
        orderCount.push(orders);
    }
    const data = {
        labels, dataset, orderCount
    }
    res.send(JSON.stringify(data));
}

reportsController.getYear = (req, res, next) => {
    res.render('pages/reports/year',
        { title: 'Thống kê năm', years });
}

reportsController.yearAnalysis = async (req, res, next) => {
    const year = req.query.year;
    const start = new Date(year, 0, 1, 0, 0, 0, 0);
    const end = new Date(year, 11, 31, 23, 59, 59, 0);
    const order = await Order.findAll({
        raw: true,
        where: {
            updatedAt: {
                [Op.between]: [start, end]
            },
            state: 'Delivered'
        },
    })
    let labels = [];
    for (let i=0;i<12;i++) {
        labels[i] = (i+1);
    }
    const dataset = [];
    const orderCount = [];

    for (let i=0;i<12;i++) {
        let sum = 0;
        let orders = 0;
        for (let j=0;j<order.length;j++)
            if (order[j].updatedAt.getMonth() == i) {
                sum += parseInt(order[j].cost);
                orders += 1;
            }
        dataset.push(sum);
        orderCount.push(orders);
    }
    const data = {
        labels, dataset, orderCount
    }
    res.send(JSON.stringify(data));
}

module.exports = reportsController;