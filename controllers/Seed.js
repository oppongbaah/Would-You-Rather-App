const Users = require('../models/users');
const Polls = require('../models/polls');
const userData = require ('../utils/users');
const pollData = require ('../utils/polls');

const seeding = async (model, data, message) => {
  try {
    const numberOfTweets = await model
    .countDocuments({},(err,num) => {
      if (err) {
        console.log(err);
      }
      return num
    })

    if (numberOfTweets > 0) {
      return
    }
    else {
      await model.create(data, (err) => {
        if (err) {
          console.log(err);
        }
        console.log(message);
      })
    }
  }
  catch (err) {
    console.log("Data Seeding Failed");
  }
}

const users = () => {
    seeding(Users, userData, 'Users seeded successfully');
}

const polls = () => {
    seeding(Polls, pollData, 'Questions seeded successfully');
}

module.exports = {
    users: users,
    polls: polls
}
