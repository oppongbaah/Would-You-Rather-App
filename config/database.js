const mongoose = require('mongoose');
const con = mongoose.connection;

const conString = "mongodb+srv://isaac:@Ikye2707@cluster0.v289i.mongodb.net/wouldyourather?retryWrites=true&w=majority";

mongoose.connect(conString,
 { useNewUrlParser: true, useUnifiedTopology: true });

con.on('connected', function() {
    console.log('database is connected successfully');
});

con.on('disconnected', function(){
    console.log('database is disconnected successfully');
})

con.on('error', console.error.bind(console, 'connection error:'));

module.exports = con;
