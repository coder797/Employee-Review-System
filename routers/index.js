// this is entry point for my all the routes and using the inbuild Router for routing
const express = require("express");
const passport = require("../configs/passport-local-strategy");
const router = express.Router();
const homeController = require("../controllers/home");

//these area the tree views that mostly look like this
router.get("/",homeController.home);
router.use('/user', require('./user'))
router.use('/admin',require('./admin'))
router.use('/employee',require('./employee'))
module.exports = router