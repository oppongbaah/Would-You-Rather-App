const User = require("../models/users");
const Poll = require("../models/polls");

module.exports = {
  fetchAll: async (req, res) => {
    try {
      await Poll.find({}).exec()
      .then((polls) => {res.status(200).json(polls)})
      .catch((err) => {res.status(404).send(err)})
    }
    catch (err) {
      res.status(500).send("Kindly check the parameters")
    }
  },
  fetchOne: async (req, res) => {
    try {
      await Poll.findById(req.params._id).exec()
      .then((poll) => {
        res.json(poll);
      })
      .catch((err) => {res.status(404).send("Page Not Found"+err)})
    }
    catch (err) {
      res.status(500).send("Internal Server Error. (Backend Error)"+err)
    }
  },
  addQuestion: async (req, res) => {
    try {
      const newPoll = new Poll(req.body);
      await newPoll.save()
      .then(async (poll) => {
          // add the question id to the user's profile
          const user = await User.findById(req.body.author).exec();
          user.questions.push(poll._id.toString());
          const newUser = new User(user);
          await newUser.save()
          .then(() => {
            res.status(200).json({
              question: poll,
              message: "Question added successfully"
            });
          })
          .catch((err) => console.log(err))
      })
      .catch((err) => console.log(err))
    }
    catch (err) {
      res.status(500).send("Internal Server Error. (Backend Error)"+err);
    }
  },
  removeQuestion: async (req, res) => {
    try {
      Poll.findById(req.params._id)
      .then(async (poll) => {
        await Poll.deleteOne({_id: req.params._id}).exec()
        .then(async (results) => {
          if (results.ok) {
            // remove the question id from the user's profile_pic
            const user = await User.findById(poll.author).exec();
            user.questions.pop(poll._id.toString());
            const newUser = new User(user);
            await newUser.save()
            .then(() => {
              res.status(200).send("Question removed successfully");
            })
            .catch((err) => {res.status(404).send("Page Not Found")+err})
            }
            else {
              res.status().send("Question could not be deleted")
            }
        })
        .catch((err) => {{res.status(404).send("Page Not Found")+err}})
      })
      .catch((err) => {{res.status(404).send("Page Not Found")+err}})
    }
    catch (err) {
      res.status(500).send("Internal Server Error. (Backend Error)"+err);
    }
  },
  saveVote: async (req, res) => {
    try {
      const pid = req.params.pid;
      const uid = req.params.uid;
      const option = req.query.option;

      const altOption = option === "optionOne" ? "optionTwo" : "optionOne";
      // add username to the votes on the question object
      await Poll.findById(pid).exec()
      .then(async (poll) => {

        if(poll[option].votes.includes(uid) ||
        poll[altOption].votes.includes(uid)) {
          res.status(401).send("You have already voted");
          return;
        }
        else {
          poll[option].votes.push(uid);
        }

        const newPoll = new Poll(poll);
        await newPoll.save()
        .then(async () => {
          // add the answer = [qid: option] to the users profile
          await User.findById(uid).exec()
          .then(async (user) => {
            user.answers.push({[pid]: option})
            // save the updated user profile
            const newUser = new User(user);
            await newUser.save()
            .then(() => {
              res.status(200).json(poll);
            })
            .catch((err) => {res.status(404).send("Page Not Found")+err})
          })
          .catch((err) => {console.log(err)})
        })
        .catch((err) => {res.status(404).send("Page Not Found")+err})
      })
      .catch((err) => {res.status(404).send("Page Not Found")+err})
    }
    catch (err) {
      res.status(500).send("Internal Server Error. (Backend Error)"+err);
    }
  }

}
