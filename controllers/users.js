const { Admin } = require('../models/');
const { User } = require('../models/');

const usersController = {};

usersController.getGuests = async (req, res, next) => {
    const limit = 10;
    const offset = req.query.page || 1;
    const guests = await User.findAll({ 
        raw: true,
        limit: limit,
        offset: (offset-1)*limit,
        order:[
            ['id', 'ASC']
        ]
    });
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

usersController.getUsers = async (req, res, next) => {
    const lastPage = Math.ceil (await User.count({ raw: true }) / 10);
    res.render('pages/users/accounts', {
         title: 'Tài khoản',
         lastPage: lastPage
     });
}

module.exports = usersController;