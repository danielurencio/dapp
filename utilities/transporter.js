var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'fondin.authorization@gmail.com',
    pass: 'fondinspacemail'
  }
});

module.exports = transporter;
