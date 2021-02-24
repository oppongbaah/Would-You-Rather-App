// These functions must be called in an async
// They return promises
const Users = require('../models/users');

module.exports = {
    delete: async (model, id) => {
        const object = await model.findById(id).exec();
        if (object) {
            await model.deleteOne({_id: object._id});
            return true;
        }
        else {
            return false;
        }
    },
    deleteAll: async (model) => {
       const objects = await model.deleteMany({}).exec();
       return objects;
    },
    deleteMany: {},
    getUsername: async (userId) => {
        const username = await Users.find({_id: userId}, 'username').exec();
        return username;
    },
    suscribeTweetToUser: async (model, userId, tweetId) => {
        // this function will not return anything as compared to the others
        const user = await model.findById(userId);
        console.log(user)
        user.tweets.push(tweetId);
        const updatedUser = new model(user);
        await updatedUser.save();
    }
}
