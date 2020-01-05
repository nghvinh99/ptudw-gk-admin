const { Order } = require('../models/');
const { User } = require('../models/');
const ordersController = {};

ordersController.getOrders = async (req, res, next) => {
    const orders = await Order.findAll({ 
        raw: true,
        order:[
            ['id', 'ASC']
        ]
     });
    const users = await Order.findAll({ 
        raw: true,
        order:[
            ['id', 'ASC']
        ],
        attributes: ['user']
    });
    let usernames = [];
    for (let i=0;i<users.length;i++) {
        const usrname = await User.findOne({
            raw: true,
            where: { id: users[i].user },
            attributes: ['username']
        })
        usernames.push(usrname);
    }
    res.render('pages/orders/list', { 
        title: 'Đơn hàng',
        orders, usernames
    });
}

ordersController.changeOrderState = async (req, res, next) => {
    const id = req.body.id;
    const state = req.body.newState
    Order.editState(id, state, () => {
        res.end();
    });
}

module.exports = ordersController;
