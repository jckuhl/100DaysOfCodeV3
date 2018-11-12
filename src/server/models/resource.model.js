const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    title: {
        type: String,
        required: true,
        trim: true,
    },
    blurb: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true,
        trim: true
    }
});

const ResourceModel = mongoose.model('ResourceModel', ResourceSchema);

module.exports = ResourceModel;