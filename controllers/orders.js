const ordersController = {};

ordersController.getOrders = (req, res, next) => {
    res.render('pages/orders/list', { title: 'Đơn hàng' });
}

module.exports = ordersController;
