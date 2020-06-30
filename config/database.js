
const mongoose = require('mongoose');

mongoose.connect(
  "mongodb+srv://deepambahre:social-post@12345@social-post.eazff.mongodb.net/Social-Post?retryWrites=true&w=majority",
        { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true, useFindAndModify: false })
    .then(() => {
        console.log("database connected successfully");
    })
    .catch((err) => {
        console.log(err.message);
    });

