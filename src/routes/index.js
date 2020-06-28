import express from "express";
import passport from "passport";
const router = express.Router();

//Get Home Route
router.route('/').get((req, res, next) => {
  res.render('index');
});

//Get Home Route
router.route('/home').get(passport.authenticate('jwt',{session:false}),(req, res, next) => {
  res.render('home');
});

export default router;