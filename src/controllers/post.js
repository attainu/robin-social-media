
//Import User Model
import Post from "../models/postSchema";
import mongoose from "mongoose";
import {validationResult} from 'express-validator';
export const AllPost = (req,res) => {
  Post
  .find()
  .sort({date:-1})
  .exec()
  .then(postsData => {
    if (postsData.length < 1) {
      return res.status(404).json({
        message: `no posts added yet...`
      });
    }
    return res.status(200).json(postsData);
  })
  .catch(err => {
    return res.status(500).json({
      error: err.message
    });
  });
};

  export const AddPost = (req,res) => {

    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {
      res.send({});
    }

    Post
    .findOne({ description: req.body.description })
    .exec()
      //Let Save Post
      let newPost = new Post({
      _id: new mongoose.Types.ObjectId(),
      description: req.body.description,
      });
      return newPost
        .save()
        .then(post => {
          return res.status(201).json(post);
          })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });
    };


  export const updatePost = (req,res) => {
    Post
    .findOne({ _id: req.params.id })
    .exec()
    .then(post => {
      if (!post) {
        return res.status(409).json({
          message: `post not found...`
        });
      }
      Post
        .update({ description: req.body.description })
        .exec()
        .then(post => {
          return res.status(200).json({success: true});
        })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
  }

  export const getPostByID = (req,res) => {
    Post.find({_id:req.params.id}, function (err, post) {
      if (err) res.send(err);
      res.json(post);
    });
  }

  export const deletePost = (req,res) => {
    Post
    .findOne({ _id: req.params.id })
    .exec()
    .then(post => {
      if (!post) {
        return res.status(409).json({
          message: `post not found...`
        });
      }
      Post
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(post => {
          return res.status(200).json({success: true});
        })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
  }