const express = require('express');
const router = express.Router();
const passport = require('../configs/passport-local-strategy');
const UserController = require('../controllers/user')

router.post('/create', passport.authenticate('local'), UserController.createSession)
router.get('/signOut', UserController.destroy)
router.get('/profile/:id', passport.checkAuthentication, UserController.profile)
router.post('/update/:id', UserController.profileUpdate)
module.exports = router