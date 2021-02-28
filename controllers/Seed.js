const Users = require('../models/users');
const userData = require ('../utils/users');

const seeding = async (model, data, message) => {
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

const users = () => {
    seeding(Users, userData, 'Users seeded successfully');
}

module.exports = {
    users: users
}
