const express = require('express');
const Post = require('../../models/Post');
const Comment = require('../../models/Comment');


const getComment =  (req, res) => {
    // Only show comments from logged in user
    Comment.find({ user: req.user._id })
        .lean()
        .populate('user')
        .then(comments => {
            res.render('user/comments', { comments });
        });
};

const createComment =  (req, res) => {
    Post.findOne({ _id: req.body.id })
        .then(post => {
            const newComment = new Comment({
                user: req.user._id,
                body: req.body.body,
            });

            post.comments.push(newComment);
            post.save().then(savePost => {
                newComment.save().then(savedComment => {
                    req.flash('success_message', 'Comment will be posted pending approval');
                    res.redirect(`/post/${post._id}`);
                });
            });
        }).catch(err => console.log(err));
};

const deleteComment =  (req, res) => {
    Comment.deleteOne({ _id: req.params.id })
        .then(deletedItem => {
            Post.findOneAndUpdate(
                { comments: req.params.id },
                { $pull: { comments: req.params.id } },
                (err, data) => {
                    if (err) console.log(err);
                    res.redirect('/user/comments');
                }
            )
        });
};

const approveComment =  (req, res) => {
    Comment.findByIdAndUpdate(req.body.id, { $set: { approveComment: req.body.approveComment } }, (err, result) => {
        if (err) return err;
        res.send(result);
    });
};

module.exports = {getComment,createComment,deleteComment,approveComment};
