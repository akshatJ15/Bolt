const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middlewares");

router.post('/register',[
    body('fullname.firstname').isLength({min:3}).withMessage('First name should be at least 3 characters long'),
    body('fullname.lastname').isLength({min:3}).withMessage('Last name should be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
],userController.register);

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({min:6}).withMessage('Password should be at least 6 characters long'),
],userController.login);

router.get('/profile',authMiddleware.authUser,userController.getUserPofile);

router.get('/logout',authMiddleware.authUser,userController.logout);

module.exports = router;