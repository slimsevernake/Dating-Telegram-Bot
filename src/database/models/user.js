const mongoose = require('mongoose');

const userScheme = mongoose.Schema({
    chat_id: {
        type: Number,
        required: true
    },
    age: {
        type: Number,
    },
    city: {
        type: String,
    },
}, { versionKey: false });

module.exports = userScheme