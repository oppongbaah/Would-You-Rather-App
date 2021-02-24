const Users = require('../models/users');

const save = async (req, res) => {
    try {
        // check if the userId does not exist in the database before signup
        const IDs = await Users.find({}, '_id', (err, ids) => {
            if (err) {
                res.send("Error connecting with database");
                return;
            }
            return ids;
        });
        const duplicateID = IDs.filter(uid => uid._id === req.body._id);
        if (!!duplicateID.length){
            res.send("User already exist")
        }
        else {
            const newUser = await new Users(req.body);
            newUser.save()
            .then((user) => res.json({message: "User added successfully", data: user}))
            .catch((error) => res.send(error))
        }
    }
    catch(error){
        res.send({error});
    }
}

const fetchAll =  (req, res) => {
    Users.find({}, (err, result) => {
        if(err) {
            return res.send(err);
        }

        return res.json(result);
    })
}

const fetchOne = async (req, res) => {
  try {
      const user = await Users.findById(req.params._id).exec();
      res.json(user);
  }
  catch (error) {
      res.json({error, message: "Kindly Check the id parameter"});
  }
}

module.exports = {
  save: save,
  fetchAll: fetchAll,
  fetchOne: fetchOne
}
