import express from "express";
const router = express.Router();
import * as postController from '../controllers/post.js';
import passport from "passport";
//import { check } from 'express-validator'

import checkAPIs from 'express-validator';
const { check } = checkAPIs;

router.route('/AllPost').get(passport.authenticate('jwt',{session:false}),postController.AllPost)
router.route('/AddPost').post(passport.authenticate('jwt',{session:false}),[
  check('description').exists().isLength({min: 10}).trim().escape().withMessage('Description must have more than 10 characters')
  ],postController.AddPost)


router.route('/:id').get(passport.authenticate('jwt',{session:false}),postController.getPostByID)
router.route('/:id').put(passport.authenticate('jwt',{session:false}),postController.updatePost)
router.route('/:id').delete(passport.authenticate('jwt',{session:false}),postController.deletePost);

export default router;