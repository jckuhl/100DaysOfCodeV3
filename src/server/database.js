const mongoose = require('mongoose');

const user = process.env.MONGO_USER;
const password = process.env.MONGO_PW;
const uri = `mongodb+srv://${user}:${password}@cluster0-vji0s.mongodb.net/100days?retryWrites=true`;

// wrap the connection in a closure so I can export it with the URI
function Connect(uri) {
    return function() {
        mongoose.connect(uri, {
            auth: {
                user,
                password
            },
            useNewUrlParser: true
        });

        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error'));
        db.once('open', ()=> {
            console.log('\nSuccessfully connected to Mongo!\n');
        });
    }
}

const MongooseConnect = Connect(uri);

module.exports = MongooseConnect;
