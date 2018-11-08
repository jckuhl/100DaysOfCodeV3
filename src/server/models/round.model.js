const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
    num: {
        type: Number,
        required: true
    },
    date: Date,
    id: String,
});

const RoundModel = mongoose.model('RoundModel', roundSchema);

module.exports = RoundModel;