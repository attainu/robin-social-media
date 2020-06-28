import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

/*
mongoose.connect(
  process.env.MONGODBlocal,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, , useFindAndModify: false })
.then(() => {
  console.log("database connected successfully");
})
.catch((err) => {
  console.log(err.message);
});
*/

mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });
