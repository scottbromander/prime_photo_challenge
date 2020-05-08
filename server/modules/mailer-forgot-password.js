const nodemailer = require('nodemailer');

module.exports = async (user, hex) => {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.NODEMAILER_USERNAME,
      pass: process.env.NODEMAILER_PASSWORD,
    },
  });

  let info = await transporter.sendMail({
    from: process.env.NODEMAILER_FROM, // sender address
    to: user.email, // list of receivers
    subject: '[DO NOT REPLY] - Password reset', // Subject line
    text: `https://primephotochallenge.herokuapp.com/#/forgot/${hex}/${user.username}`, // plain text body
    html: `
    <div style="background-color: black; color: white; text-align: center; padding: 15px;">
      <h3>CHANGE PASSWORD</h3>
      <p>Click on the link below to change your password for Prime Photo Challenge</p>
      <p><a href="https://primephotochallenge.herokuapp.com/#/forgot/${hex}/${user.username}">Change Password</a></p>
      <h5>Note that this link will expire in 5 minutes.</h5>
    </div>
    `, // html body
  });
};
