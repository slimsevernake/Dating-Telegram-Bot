const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const relationScheme = new Schema({
    host_id: {
        type: Number,
        required: true
    },
    cli_id: {
        type: Number,
        required: true
    },
    host_like: {
        type: Boolean,
        required: true
    },
    cli_checked: {
        type: Boolean,
        required: true
    },
    msg_text: {
        type: String,
    },
}, { versionKey: false });

const Relation = mongoose.model('Relation', relationScheme)

module.exports = Relation