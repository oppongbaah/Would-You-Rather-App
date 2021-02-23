const mongoose = require('mongoose');

const conString = "mongodb+srv://isaac:@Ikye2707@cluster0.v289i.mongodb.net/wouldyourather?retryWrites=true&w=majority";

mongoose.connect(conString, {useNewUrlParser: true, useUnifiedTopology: true})
.then(results => {
  console.log('database is connected successfully!');
})
.catch((err) => {
  console.log('database is disconnected successfully!');
})

module.exports = mongoose;
