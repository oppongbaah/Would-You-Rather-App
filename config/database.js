const mongoose = require('mongoose');

const conString = process.env.MONGO_URL;

mongoose.connect(conString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(results => {
  console.log('database is connected successfully!');
})
.catch((err) => {
  console.log('database is disconnected successfully!');
})

module.exports = mongoose;
