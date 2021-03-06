const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: false
    },
    username: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    password: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    email: {
        type: String,
        trim: true,
        required: true,
        unique: true
    }
});

UserSchema.pre('save', function(next) {
    bcrypt.hash(this.password, 10, (error, hash)=> {
        if(error) {
            return next(error);
        }
        this.password = hash;
        next();
    });
});

const UserModel = mongoose.model('user', UserSchema);

module.exports = UserModel;