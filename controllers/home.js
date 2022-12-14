const passport = require('../configs/passport-local-strategy')
const User = require("../models/user");

module.exports.home = async (req, res) => {
    const employee = await User.find({userType: 'employee'})
    if (req.isAuthenticated()) {
        if (req.user.userType == 'admin') {
            return res.render('admin_dashboard', {title: 'Admin Dashboard', employees: employee})
        } else {
            return res.redirect('/employee')
        }

    }
    return res.render('home', {title: 'Log In'})
}