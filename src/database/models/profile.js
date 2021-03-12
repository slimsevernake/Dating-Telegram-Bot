const mongoose = require('mongoose');

const profileScheme = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    chat_id: {
        type: Number,
        required: true
    },
    gender: {
        type: Number,
        required: true
    },
    interest: {
        type: Number,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    decsript: {
        type: String
    },
    avatar: {
        type: String,
        required: true
    },
    is_active: {
        type: Boolean,
        required: true
    },
    strikes: {
        type: Number,
        required: true
    },
    activities_block: {
        type: Boolean,
    },
    likes: {
        type: Number,
    },
    attraction: {
        type: Number,
    }
}, { versionKey: false });

// const Profile = mongoose.model('Profile', profileScheme)

module.exports = profileScheme