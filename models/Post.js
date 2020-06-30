const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const URLSlugs = require('mongoose-url-slugs');

const PostSchema = new Schema({
    author: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    title: {
        type: String,
        required: true,
    }, 
    slug: {
        type: String,
    },
    status: {
        type: String,
        default: 'public',
    },
    allowComments: {
        type: Boolean,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    file: {
        type: String,
    },
    date: {
        type: Date,
        default: Date.now(),
    },
    comments: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment',
    }],
}, { usePushEach: true });

PostSchema.plugin(URLSlugs('title', { field: 'slug' }));
 
module.exports = mongoose.model('Post', PostSchema);
