import express from "express";
const router = express.Router();
import * as userController from '../controllers/user.js';
import passport from "passport";

router.route('/AllUser').get(userController.AllUser)
router.get('/register', (req, res) => {
    res.render('register');
});
router.route('/register').post(userController.register)
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