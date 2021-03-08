const Users = require('../../models/users');
const zip = require('./zip');

module.exports = {
    authed: (req, res) => {
        let authedDetails = req.headers.authorization;
        //Extracting username:password from the encoding Authorization: Basic username:password
        const bufferedData = new Buffer.from(authedDetails.split(" ")[1], 'base64');
        const [userId, password] = bufferedData.toString().split(":");
        // check if username and password are not empty
        if (!userId || !password) {
          res.status(401).json({
            message: "username and password do not match",
            status: 401
          });
        }
        else {
            // use the username and check if username and password actually exist in the database
            Users.find({_id: userId}, "_id username password", (err, user) => {
                // decrypt the password
                if (err) {
                    // retry
                    res.setHeader("WWW-Authenticate", "Basic");
                    res.status(401).json({
                      message: err,
                      status: 401
                    });
                }

                if (user.length){
                    if(userId === user[0]._id && password === user[0].password) {
                        // encrypt the data before you save it as a cookie
                        const encryptedCookie = zip.encrpyt(userId);

                        return res.status(200).json({
                            message: `Welcome ${user[0].username}`,
                            name: userId,
                            status: 200,
                            token: encryptedCookie
                        });
                    }
                    else {
                        res.setHeader("WWW-Authenticate", "Basic");
                        res.status(401).json({
                          message: "username and password do not match",
                          status: 401
                        });
                    }
                }
                else {
                  res.status(401).json({
                    message: "username and password do not match",
                    status: 401
                  });
                }
            });
        }
    }
}
