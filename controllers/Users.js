const Users = require('../models/users');
const helpers = require('./helpers');
const multer = require('multer');

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
            res.status(204).send("User already exist")
        }
        else {
            const newUser = await new Users(req.body);
            newUser.save()
            .then((user) => res.send("User added successfully"))
            .catch((error) => res.status(401).send(error))
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

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './public/uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const uploadImage = (req, res) => {
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single("myImage");

    upload(req, res, function(err) {
      // req.file contains information of uploaded file
      // req.body contains information of text fields, if there were any

      if (req.fileValidationError) {
          console.log(req.fileValidationError)
      }
      else if (!req.file) {
          console.log('Please select an image to upload');
      }
      else if (err instanceof multer.MulterError) {
          console.log(err);
      }
      else if (err) {
          console.log(err);
      }
    })
}

module.exports = {
  save: save,
  fetchAll: fetchAll,
  fetchOne: fetchOne,
  uploadImage: uploadImage
}
