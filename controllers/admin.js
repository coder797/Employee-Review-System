const User = require("../models/user");
const Performance = require('../models/Performance')
const path = require("path");
module.exports.create = async (req, res) => {
    try {
        await User.create(req.body)
    } catch (err) {
        console.log(err)
    }
    return res.redirect('/')
}
module.exports.adminViewEmployee = async (req, res) => {
    const userReadUpdate = await User.findById(req.params.id).populate({
        path: 'performanceList', populate: {path: 'reviewBy'}
    })

    const employee = await User.find({userType: 'employee'})
    return res.render('admin_employee_view', {title: 'Employee', employees: employee, userp: userReadUpdate})

}
module.exports.reviewRequest = async (req, res) => {
    console.log(req.body)
    if (req.xhr) {
        // await User.findByIdAndUpdate(req.body.userRequest, {$push: {"listToReview": req.body.checkedVa}})
        // const re = await User.findOne({listToReview:req.body.checkedVa})
        // await  User.findByIdAndUpdate(req.body.userRequest, {$pull: {"listToReview": req.body.checkedVa}})
        // console.log(await User.findOne({listToReview:req.body.checkedVa}))
        try {
            if (!await User.findOne({listToReview: req.body.checkedVa})) { // no duplicate reviews one id goes only one time
                await User.findByIdAndUpdate(req.body.userRequest, {$push: {"listToReview": req.body.checkedVa}})
            }
            return res.status(200).json({
                data: 'hi'
            })
        } catch (err) {
            console.log(err)
        }

    }
}
module.exports.reviewUpdate = async (req, res) => {

    if (req.xhr) {
        if (req.user.userType == 'admin') {
            await Performance.findByIdAndUpdate(req.body.performanceId, req.body)
            return res.status(200).json({
                data: 'Good'
            })
        }

        console.log(req.body)

    }
}
module.exports.reviewDelete = async (req, res) => {
    if (req.xhr) {
        if (req.user.userType == 'admin') {
            await Performance.findByIdAndDelete(req.body.performanceId)
            return res.status(200).json({
                data: 'Good'
            })
        }


    }
}
module.exports.createReview = async (req, res) => {
    const p = await Performance.create(req.body)
    await User.findByIdAndUpdate(req.body.reviewFor, {$push: {"performanceList": p._id}})
    // await User.findByIdAndUpdate(req.body.reviewBy, {$pull: {"listToReview": req.body.reviewFor}}) // review given so need to delete it
    // from the list to review so that no two reviews or more for one request
    return res.redirect('back')
}