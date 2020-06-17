import express from "express";
const router = express.Router();
import * as postController from '../controllers/post';
import passport from "passport";


router.route('/AllPost').get(postController.AllPost)
router.route('/AddPost').post(postController.AddPost)


router.route('/:id').get(postController.getPost)
router.route('/:id').put(postController.updatePost)
router.route('/:id').delete(postController.deletePost);

export default router;