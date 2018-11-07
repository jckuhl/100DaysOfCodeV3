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
    round: Number,
    date: Date,
    id: String
});

const PostStatus = mongoose.model('Post', postSchema);

module.exports = PostStatus;