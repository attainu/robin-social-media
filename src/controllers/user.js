
import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//Import User Model
import User from "../models/userSchema.js";

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

      //make sure that user not exist already in database
      User.find({email:req.body.email}).exec().then(user => {
        if(user.length >= 1){
            return res.status(409).json({message:"user already exist cant register"});
        } else {
            bcrypt.hash(req.body.password,10,(err,hash) => {
                if(err) {
                    return res.status(500).json({error:err});
                } else {

                    let newUser = new User({
                        _id: new mongoose.Types.ObjectId(),
                        name:req.body.name,
                        email:req.body.email,
                        username:req.body.username,
                        password: hash
                    });
                        newUser.save().then(response => {
                            console.log(response);
                            return res.status(201).json({message:"User Added Successfully"});

                        }).catch(err => {
                            console.log(err);
                            res.status(500).json({error:err});
                        });

                }
            })
        }
    }).catch(err => {
      console.log(err);
      res.status(500).json({error:err});
  });

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
  User.find({_id:req.params.id}).exec((err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }
    if(user.length){
      return res.json({'success':true,'message':'User fetched by id successfully',user});
    }
    else{
      return res.json({'success':false,'message':'User with the given id not found'});
    }
  })
}

//Update Users
export const updateUser = (req,res, next) => {
  User.findByIdAndUpdate(req.params.id, req.body, function (err, user) {
    if (err) return next(err);
    res.send('User updated.');
});
};

//Delete Users
export const deleteUser = (req,res) => {
  User.findByIdAndRemove(req.params.id, (err,user) => {
    if(err){
    return res.json({'success':false,'message':'Some Error'});
    }

    return res.json({'success':true,message : 'User deleted successfully'});
  })
}

//User logout
export const logout = (req,res) => {
    req.logout();
    res.status(200).json({message: "logout successfully"});
}

//Search User By Username
export const searchUserByName = (req,res) => {

User.findOne({username: new RegExp('^'+req.params.username+'$', "i")}, function (err, user) {
  if (err) return next(err);
  res.send(user);
})

}

