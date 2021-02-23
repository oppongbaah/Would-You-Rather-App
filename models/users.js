const { TooManyRequests } = require('http-errors');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    _id: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    imageURL: {
        type: String,
        required: false
    },
    questions: {
        type: Array,
        required: false
    }
});

module.exports = mongoose.model('Users', userSchema);
