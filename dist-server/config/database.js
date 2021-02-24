"use strict";

var mongoose = require('mongoose');

var conString = process.env.MONGO_URL;
mongoose.connect(conString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function (results) {
  console.log('database is connected successfully!');
})["catch"](function (err) {
  console.log('database is disconnected successfully!');
});
module.exports = mongoose;