
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {validationResult} from 'express-validator';

//Import User Model
import User from "../models/userSchema";

//import JWT Token
const JWT_KEY = process.env.JWT_KEY;

export const UserId = {};

//Get All Users
export const AllUser = (req,res) => {
    User
    .find()
    .sort({date:-1})
    .select('name email username date')
    .exec()
    .then(users => {
      if (users.length < 1) {
        return res.status(404).json({
          message: `no users added yet...`
        });
      }
      return res.status(200).json(users);
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
};

//Users Registration
export const register =  (req,res) => {

    const errors = validationResult(req);
    console.log(req.body);

    if (!errors.isEmpty()) {
      return res.status(422).jsonp(errors.array());
    } else {

    

    User
    .findOne({ email: req.body.email })
    .exec()
    .then(user => {
      if (user) {
        return res.status(409).json({
          message: 'User Already Exist'
        });
      }
      User
        .findOne({ username: req.body.username })
        .exec()
        .then(user => {
          if (user) {
            return res.status(409).json({
              message: 'invalid username...'
            });
          }

          bcrypt.genSalt(10, (err, salt) => {
            if (err) throw err.message;
            bcrypt.hash(req.body.password, salt, (err, hash) => {
              if (err) throw err.message;
              //Let Save User
              let newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                name: req.body.name,
                email: req.body.email,
                username: req.body.username,
                password: hash
              });
              return newUser
                .save()
                .then(user => {
                  //return res.status(201).json(user);
                  return res.status(201).json(user, {
                    message: 'User already registered.'
                });
                })
                .catch(err => {
                  return res.status(500).json({
                    error: err.message
                  });
                });
            });
          });
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
};

//Users Login
export const login = (req,res) => {

    User
    .findOne({ username: req.body.username })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: `no user found...`
        });
      }
      bcrypt.compare(req.body.password, user.password, (err, isMatch) => {
        if (err) console.log(err);
        if (isMatch) {
          const token = jwt.sign(
            {user},
            JWT_KEY,
            {expiresIn: '1h'}
          );
          res.status(200).json({
            success: true,
            token: `Bearer: ${token}`,
            user: {
              name: user.name,
              email: user.email,
              username: user.username,
              id: user._id,
              $push: {id :UserId}
            }
          });
        } else {
          return res.status(409).json({
            message: `invalid password...`
          });
        }
      });
    })
    .catch(err => {
      return res.status(500).json({
        error: err.message
      });
    });
};

//Users Profile
export const profile = (req,res) => {
    let currentUser = req.user;
    if (!currentUser) {
      return res.status(409).json({
        message: `user not found...`
      });
    }
    res.status(200).json({
      user: currentUser
    })
};

//Get Single User
export const getUser = (req,res, next) => {
  User.findById(req.params._id, function (err, user) {
    if (err) return next(err);
    res.send(user);
})
}

//Update Users
exports.updateUser = (req,res, next) => {
  User.findByIdAndUpdate(req.params._id, {$set: req.body}, function (err, user) {
    if (err) return next(err);
    res.send('User updated.');
});
};


//Delete Users
export const deleteUser = (req,res) => {
    User
    .findOne({ _id: req.params._id })
    .exec()
    .then(user => {
      if (!user) {
        return res.status(409).json({
          message: `user not found...`
        });
      }
      User
        .deleteOne({ _id: req.params._id })
        .exec()
        .then(user => {
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

//User logout
export const logout = (req,res) => {
    req.logout();
    res.json({message: "logout successfully"});
}

//Search User By Username
export const searchUserByName = (req,res) => {

User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function (err, user) {
  if (err) return next(err);
  res.send(user);
})
 
}