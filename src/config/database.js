import mongoose from "mongoose";
const dotenv = require('dotenv')
dotenv.config();

/*
mongoose.connect(
  process.env.MONGODBlocal,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
.then(() => {
  console.log("database connected successfully");
})
.catch((err) => {
  console.log(err.message);
});
*/

mongoose.connect(
        process.env.MONGODB_URI,
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });
