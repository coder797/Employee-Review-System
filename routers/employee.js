const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employee')
const passport = require('../configs/passport-local-strategy')
router.get('/', passport.checkEmployeeAuth, employeeController.home)
router.get('/review/:id',passport.checkEmployeeAuth,employeeController.employeeReviewsOther)
router.post('/createReview',passport.checkEmployeeAuth,employeeController.employeeReviewsOtherCreate)
module.exports = router