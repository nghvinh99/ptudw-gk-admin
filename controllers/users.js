const usersController = {};

usersController.getUsers = (req, res, next) => {
    res.render('pages/users/accounts',
        { title: 'Tài khoản' });
}

module.exports = usersController;