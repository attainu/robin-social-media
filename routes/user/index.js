const express = require('express');
const router = express.Router();
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { userAuthenticated } = require('../../helpers/authentication');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'user';
    next();
});

router.get('/', (req, res) => {

    const perPage = 10;
    const page = req.query.page || 1;
    Post.find({})
        .lean()
        .skip((perPage * page) - perPage)
        .limit(perPage)
        .then(posts => {
            Post.countDocuments().then(postCount => {
                Category.find({})
                    .lean()
                    .then(categories => {
                        res.render('user/index', {
                            posts,
                            categories,
                            current: parseInt(page),
                            pages: Math.ceil(postCount / perPage),
                        });
                    });
            });
        });

});

module.exports = router;
