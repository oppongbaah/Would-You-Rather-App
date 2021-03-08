"use strict";

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var Users = require('../../models/users');

var zip = require('./zip');

module.exports = {
  authed: function authed(req, res) {
    var authedDetails = req.headers.authorization; //Extracting username:password from the encoding Authorization: Basic username:password

    var bufferedData = new Buffer.from(authedDetails.split(" ")[1], 'base64');

    var _bufferedData$toStrin = bufferedData.toString().split(":"),
        _bufferedData$toStrin2 = _slicedToArray(_bufferedData$toStrin, 2),
        userId = _bufferedData$toStrin2[0],
        password = _bufferedData$toStrin2[1]; // check if username and password are not empty


    if (!userId || !password) {
      res.status(401).json({
        message: "username and password do not match",
        status: 401
      });
    } else {
      // use the username and check if username and password actually exist in the database
      Users.find({
        _id: userId
      }, "_id username password", function (err, user) {
        // decrypt the password
        if (err) {
          // retry
          res.setHeader("WWW-Authenticate", "Basic");
          res.status(401).json({
            message: err,
            status: 401
          });
        }

        if (user.length) {
          if (userId === user[0]._id && password === user[0].password) {
            // encrypt the data before you save it as a cookie
            var encryptedCookie = zip.encrpyt(userId);
            return res.status(200).json({
              message: "Welcome ".concat(user[0].username),
              name: userId,
              status: 200,
              token: encryptedCookie
            });
          } else {
            res.setHeader("WWW-Authenticate", "Basic");
            res.status(401).json({
              message: "username and password do not match",
              status: 401
            });
          }
        } else {
          res.status(401).json({
            message: "username and password do not match",
            status: 401
          });
        }
      });
    }
  }
};