import mongoose from "mongoose";
const Schema = mongoose.Schema;

let postSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  description: {
    type: String,
    required: [true, 'description is required...']
  },
  addedBy:{
    type: mongoose.Schema.Types.String,
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('post', postSchema);