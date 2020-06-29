import express from "express";
const router = express.Router();
import * as commentController from '../controllers/comment.js';
import passport from "passport";
import { check } from 'express-validator'

router.route('/AllComment').get(passport.authenticate('jwt',{session:false}),commentController.AllComment)
router.route('/AddComment/:PostId').post(passport.authenticate('jwt',{session:false}),[
  check('opinion').exists().isLength({min: 10}).trim().escape().withMessage('Opinion must have more than 10 characters')
  ],commentController.AddComment)


router.route('/:id').get(passport.authenticate('jwt',{session:false}),commentController.getCommentByID)
router.route('/:id').put(passport.authenticate('jwt',{session:false}),commentController.updateComment)
router.route('/:id').delete(passport.authenticate('jwt',{session:false}),commentController.deleteComment);

export default router;