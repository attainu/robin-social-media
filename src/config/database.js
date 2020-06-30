import mongoose from "mongoose";

mongoose.connect(
  'mongodb+srv://deepambahre:social-media@12345@social-media-qsssx.mongodb.net/Social-Media?retryWrites=true&w=majority',
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });
