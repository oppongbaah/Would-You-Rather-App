"use strict";

// Nodejs encryption with CTR
var crypto = require('crypto');

var algorithm = 'aes-256-cbc';
var key = crypto.randomBytes(32);
var iv = crypto.randomBytes(16);

var encrypt = function encrypt(text) {
  var cipher = crypto.createCipheriv('aes-256-cbc', Buffer.from(key), iv);
  var encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher["final"]()]);
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex')
  };
};

var hash = function hash(text) {
  return crypto.createHash("sha256").update(text).digest("base10");
};

var decrypt = function decrypt(text) {
  var iv = Buffer.from(text.iv, 'hex');
  var encryptedText = Buffer.from(text.encryptedData, 'hex');
  var decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), iv);
  var decrypted = decipher.update(encryptedText);
  decrypted = Buffer.concat([decrypted, decipher["final"]()]);
  return decrypted.toString();
};

module.exports = {
  encrpyt: encrypt,
  decrypt: decrypt,
  hash: hash
};