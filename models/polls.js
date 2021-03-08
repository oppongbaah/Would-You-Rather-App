const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pollSchema = new Schema({
    author: {
      type: String,
      required: true
    },
    timestamp: {
      type: Number,
      required: true
    },
    optionOne: {
      votes: {
        type: Array,
        require: false
      },
      text: {
        type: String,
        required: false
      }
    },
    optionTwo: {
      votes: {
        type: Array,
        require: false
      },
      text: {
        type: String,
        required: false
      }
    }
});

module.exports = mongoose.model('Polls', pollSchema);
