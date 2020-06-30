
//Import User Model
import Comment from "../models/commentSchema.js";
import mongoose from "mongoose";
import Post from "../models/postSchema.js";

export const AllComment = (req,res) => {
  Comment
  .find()
  .sort({date:-1})
  .exec()
  .then(commentsData => {
    if (commentsData.length < 1) {
      return res.status(404).json({
        message: `no comments added yet...`
      });
    }
    return res.status(200).json(commentsData);
  })
  .catch(err => {
    return res.status(500).json({
      error: err.message
    });
  });
};

  export const AddComment = (req,res) => {

      Post.findById(req.params.PostId)
      .then(post => {
          if(!post) {
              return res.status(404).send({
                  message: "Post not found with id " + req.params.PostId
              });
          }
          else{

    Comment
    .findOne({ opinion: req.body.opinion })
    .exec()
      //Let Save Comment
      let newComment = new Comment({
      _id: new mongoose.Types.ObjectId(),
      opinion: req.body.opinion
      });
      return newComment
        .save()
        .then(comment => {
          return res.status(201).json(comment);
          })
        .catch(err => {
          return res.status(500).json({
            error: err.message
          });
        });

      }
    }).catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
    };

  export const updateComment = (req,res) => {
    Comment.findByIdAndUpdate(req.params.id, req.body, function (err, comment) {
      if (err) return next(err);
      res.send('Comment updated.');
  });
  }

  export const getCommentByID = (req,res) => {
    Comment.find({_id:req.params.id}, function (err, comment) {
      if (err) res.send(err);
      res.json(comment);
    });
  }

  export const deleteComment = (req,res) => {
    Comment
    .findOne({ _id: req.params.id })
    .exec()
    .then(comment => {
      if (!comment) {
        return res.status(409).json({
          message: `comment not found...`
        });
      }
      Comment
        .deleteOne({ _id: req.params.id })
        .exec()
        .then(comment => {
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
