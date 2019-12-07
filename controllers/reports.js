const reportsController = {};

reportsController.getDay = (req, res, next) => {
    res.render('pages/reports/day',
        { title: 'Thống kê ngày' });
}

reportsController.getWeek = (req, res, next) => {
    res.render('pages/reports/week',
        { title: 'Thống kê tuần' });
}

reportsController.getMonth = (req, res, next) => {
    res.render('pages/reports/month',
        { title: 'Thống kê tháng' });
}

reportsController.getQuarter = (req, res, next) => {
    res.render('pages/reports/quarter',
        { title: 'Thống kê quý' });
}

reportsController.getYear = (req, res, next) => {
    res.render('pages/reports/year',
        { title: 'Thống kê năm' });
}

module.exports = reportsController;