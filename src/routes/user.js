import express from "express";
const router = express.Router();
import * as userController from '../controllers/user.js';
import passport from "passport";
//import {body} from 'express-validator';
const { body } = require('express-validator');

router.route('/AllUser').get(userController.AllUser)
router.get('/register', (req, res) => {
    res.render('register');
});
router.route('/register').post([
    body('name').exists().isLength({min: 2}).trim().escape().withMessage('Name must have more than 2 characters'),
    body('email', 'Your email is not valid').not().isEmpty().isEmail().normalizeEmail(),
    body('username').exists().isLength({min: 5}).trim().escape().withMessage('Username must have more than 5 characters'),
    body('password', 'Your password must be at least 3 characters').not().isEmpty().isLength({min: 3})
  ],userController.register)
router.get('/login', (req, res) => {
    res.render('login');
});
router.route('/login').post(userController.login)
router.route('/profile').get(passport.authenticate('jwt',{session:false}),userController.profile);
router.route('/logout').post(userController.logout)

router.route('/:id').get(userController.getUser)
router.route('/:id').put(userController.updateUser)
router.route('/:id').delete(userController.deleteUser);

router.route('/:username').post(userController.searchUserByName)

export default router;