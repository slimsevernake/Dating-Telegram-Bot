const mongoose = require('mongoose');

const cityScheme = mongoose.Schema({
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
    }
}, { versionKey: false });

// const City = mongoose.model('City', cityScheme)

module.exports = cityScheme