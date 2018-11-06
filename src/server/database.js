const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const pw = process.env.MONGO_PW;
const uri = `mongodb+srv://${user}:${pw}@cluster0-vji0s.mongodb.net/100days?test?retryWrites=true`;

mongoose.connect(uri);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', ()=> {
    console.log('connected!');
});

const postSchema = new mongoose.Schema({
    title: String,
    body: String,
    round: Number,
    date: Date,
    id: String
});

const PostStatus = mongoose.model('Post', postSchema);

module.exports = {
    PostStatus
}