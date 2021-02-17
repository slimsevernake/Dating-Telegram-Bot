const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const profileScheme = new Schema({
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
    }
}, { versionKey: false });

const Profile = mongoose.model('Profile', profileScheme)

module.exports = Profile