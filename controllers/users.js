const { Admin } = require('../models/');
const { User } = require('../models/');

const usersController = {};

usersController.getGuests = async (req, res, next) => {
    const guests = await User.findAll({ raw: true });
    res.send(JSON.stringify(guests));
}

usersController.getAdmins = async (req, res, next) => {
    const admins = await Admin.findAll({ raw: true });
    res.send(JSON.stringify(admins));
}

usersController.blockUser = (req, res, next) => {
    const id = req.body.id;
    User.block(id, true);
    res.end();
}

usersController.unblockUser = (req, res, next) => {
    const id = req.body.id;
    User.block(id, false);
    res.end();
}

usersController.getUsers = (req, res, next) => {
    res.render('pages/users/accounts',
        { title: 'Tài khoản' });
}

module.exports = usersController;