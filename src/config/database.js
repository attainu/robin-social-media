import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

/*
//Import MONGOUI
import { MONGO_UI } from "./keys";

//Connecting to mongodb
mongoose.connect(MONGO_UI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
mongoose.Promise = global.Promise;
let connection = mongoose.connection;

//Check for errors
connection.on('error', (err) => {
  if (err) console.log(err);
});

//Check for connections
connection.once('open', () => console.log(`connecting to mongodb...`));

*/

mongoose.connect(
  process.env.MONGODB_URI,
  { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
)
.then(() => {
  console.log("database connected successfully");
  })
.catch((err) => {
  console.log(err);
});
