const mongoose = require('mongoose');

const roundSchema = new mongoose.Schema({
    number: Number,
    date: Date,
    id: String,
    selected: {
        type: Boolean,
        required: false
    }
});

const RoundModel = mongoose.model('RoundModel', roundSchema);

module.exports = RoundModel;