const express = require('express');
const router = express.Router();
const CommentRoute = require('../../controllers/user/comments');

router.all('/*', (req, res, next) => {
    req.app.locals.layout = 'user';
    next();
});

router.get('/', CommentRoute.getComment);

router.post('/', CommentRoute.createComment );

router.delete('/:id', CommentRoute.deleteComment);

router.post('/approve-comment', CommentRoute.approveComment);

module.exports = router;
