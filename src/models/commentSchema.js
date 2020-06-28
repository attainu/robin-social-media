import mongoose from "mongoose";
const Schema = mongoose.Schema;

let commentSchema = new Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId
  },
  opinion: {
    type: String,
    required: [true, 'opinion is required...']
  },
  date: {
    type: Date,
    default: Date.now
  }
});

export default mongoose.model('comment', commentSchema);