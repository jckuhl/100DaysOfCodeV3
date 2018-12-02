const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    comments: [{
        message: String,
        author: String,
        date: Date,
        likes: Number,
        replies: [ { comment: String } ]
    }],
    likes: Number,
    round: Number,
    date: Date,
    id: String
});

const PostStatus = mongoose.model('Post', postSchema);

module.exports = PostStatus;