const User = require("../models/user");
module.exports.createSession = async (req, res) => {
    console.log(req.user)
    return res.redirect('/')
}
module.exports.destroy = async (req, res, next) => {
    req.logout(function (err) {
        if (err) {
            return next(err);
        }
        res.locals.user = ''
        res.redirect('/');
    });
}
module.exports.profile = async (req, res) => {
    const id = req.params.id
    const user = await User.findById(id)
    console.log(user)
    if (req.user.userType != 'admin' && user.userType == 'admin') {
        return res.send('cant view profile of an admin while being an employee')
    }
    return res.render('profile', {title: 'Profile', userp: user})
}
module.exports.profileUpdate = async (req, res) => {

    if (typeof req.body.delete == 'string') { // if its a delete request
        console.log(req.user)
        console.log(req.params.id)
        if (req.user._id = req.params.id) {
            return res.send('you cannot delete your self')
        }
        await User.findByIdAndDelete(req.params.id)
        return res.redirect('/')
    } else {
        req.body.password == '' ? delete req.body['password'] : req.body
        await User.findByIdAndUpdate(req.params.id, req.body)
        return res.redirect('back')


    }


}