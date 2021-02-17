const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cityScheme = new Schema({
    city_name: {
        type: String,
        required: true
    },
    city_lat: {
        type: String,
        required: true
    },
    city_lng: {
        type: String,
        required: true
    },
    users: {
        type: Number,
        required: true
    }
}, { versionKey: false });

const City = mongoose.model('City', cityScheme)

module.exports = City