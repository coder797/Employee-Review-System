const express = require('express');
const router = express.Router();
const adminController = require('../controllers/admin')
const passport = require('../configs/passport-local-strategy')
router.post('/create', passport.adminAuth, adminController.create)
router.get('/employee/:id', passport.adminAuth, adminController.adminViewEmployee)
router.post('/reviewRequest', adminController.reviewRequest)
router.post('/review/update', adminController.reviewUpdate)
router.post('/review/delete', adminController.reviewDelete)
router.post('/createReview', adminController.createReview)

module.exports = router