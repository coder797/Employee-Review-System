const User = require("../models/user");
const Performance = require('../models/Performance')
module.exports.home = async (req, res) => {
    const employee = await User.find({}).populate('performanceList listToReview')
    const user = await User.findById(req.user.id).populate('performanceList listToReview')
    const userReadUpdate = await User.findById(req.user.id).populate({
        path: 'performanceList', populate: {path: 'reviewBy'},

    }).populate('listToReview')
    console.log(userReadUpdate)
    return res.render('employee_view', {title: 'Employee View', userp: userReadUpdate, employees: employee})
}
module.exports.checkReviewAuth = async (req, res) => {
    const user = await User.findById(req.user._id)
    console.log(user)
    for (review of req.user.listToReview) {
        console.log(review)
    }
}

module.exports.employeeReviewsOther = async (req, res) => {
    const user = await User.findById(req.params.id)
    return res.render('employee_reviews_other', {title: 'Employee Review', userp: user})
}
module.exports.employeeReviewsOtherCreate = async (req, res) => {
    const p = await Performance.create(req.body)
    await User.findByIdAndUpdate(req.body.reviewFor, {$push: {"performanceList": p._id}})
    await User.findByIdAndUpdate(req.body.reviewBy, {$pull: {"listToReview": req.body.reviewFor}}) // review given so need to delete it
    // from the list to review so that no two reviews or more for one request

}