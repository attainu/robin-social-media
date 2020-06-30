const express = require('express');
const router = express.Router();
const { userAuthenticated } = require('../../helpers/authentication');
const Post = require('../../models/Post');
const Category = require('../../models/Category');
const { isEmpty, uploadDir } = require('../../helpers/upload-helper')
const fs = require('fs');

router.all('/*', userAuthenticated, (req, res, next) => {
    req.app.locals.layout = 'user';
    next();
});

router.get('/', (req, res) => {
    Post.find({})
        .lean()
        .populate('category')
        .then(posts => {
            res.render('user/posts', { posts });
        });
});

router.get('/my-posts', (req, res) => {
    Post.find({ author: req.user._id })
        .lean()
        .populate('category')
        .then(posts => {
            res.render('user/posts/my-posts', { posts });
        });
});

router.get('/create', (req, res) => {
    Category.find({})
        .lean()
        .then(categories => {
            res.render('user/posts/create', { categories });
        })
});

router.post('/create', (req, res) => {
    let errors = [];
    if (!req.body.title) errors.push({message: 'Please add a title'});
    if (!req.body.status) errors.push({message: 'Please add a status'});
    if (!req.body.body) errors.push({message: 'Please add a description'});

    if (errors.length > 0) {
        res.render('user/posts/create', { errors })
    } else {
        let filename = 'not-found.jpg';

        if (!isEmpty(req.files)) {
            let file = req.files.file;
            filename = `${Date.now()}-${file.name}`;

            file.mv(`./public/uploads/${filename}`, (err) => {
                if (err) throw err;
            });
        }

        let allowComments = true;
        if (req.body.allowComments) {
            allowComments = true;
        } else {
            allowComments = false;
        }

        const newPost = new Post({
            author: req.user._id,
            title: req.body.title,
            status: req.body.status,
            allowComments,
            body: req.body.body,
            category: req.body.category,
            file: filename,
        });

        newPost.save().then(savedPost => {
            req.flash('success_message', `Post ${savedPost.title} was created successfully`);
            res.redirect('/user/posts');
        }).catch(error => console.log('could not save post', error));
    }
});

router.get('/edit/:id', (req, res) => {
    Post.findOne({_id: req.params.id}).lean().then(post => {
        Category.find({})
            .lean()
            .then(categories => {
                res.render('user/posts/edit', { post, categories });
            });
    });
});

router.put('/edit/:id', (req, res) => {

    Post.findOne({ _id: req.params.id })
        .then(post => {
            let allowComments = true;
            if (req.body.allowComments) {
                allowComments = true;
            } else {
                allowComments = false;
            }

            post.author = req.user._id;
            post.title = req.body.title;
            post.status = req.body.status;
            post.allowComments = allowComments;
            post.body = req.body.body;
            post.category = req.body.category;

            if (!isEmpty(req.files)) {
                let file = req.files.file;
                filename = `${Date.now()}-${file.name}`;
                post.file = filename;

                file.mv(`./public/uploads/${filename}`, (err) => {
                    if (err) throw err;
                });
            }

            post.save().then(updatedPost => {
                req.flash('success_message', 'Post was successfully updated');
                res.redirect('/user/posts/my-posts');
            });
        });
});

router.delete('/:id', (req, res) => {
    Post.findOne({_id: req.params.id})
        .populate('comments')
        .then(post => {
            fs.unlink(uploadDir + post.file, (err) => {
                if (!post.comments.length < 1) {
                    post.comments.forEach(comment => {
                        comment.remove();
                    });
                }

                post.remove().then(removedPost => {
                    req.flash('success_message', 'Post was successfully deleted');
                    res.redirect('/user/posts/my-posts');
                });
            });
        });
});

module.exports = router;
