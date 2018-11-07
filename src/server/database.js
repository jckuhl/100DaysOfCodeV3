const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const pw = process.env.MONGO_PW;
const uri = `mongodb+srv://${user}:${pw}@cluster0-vji0s.mongodb.net/100days?test?retryWrites=true`;

// wrap the connection in a closure so I can export it with the URI
function Connect(uri) {
    return function() {
        mongoose.connect(uri);

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', ()=> {
            console.log('\nSuccessfully connected to Mongo!\n');
        });
    }
}

const MongooseConnect = Connect(uri);

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

module.exports = {
    MongooseConnect,
    PostStatus
}