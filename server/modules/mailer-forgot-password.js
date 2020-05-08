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
    subject: 'Password reset', // Subject line
    text: `https://primephotochallenge.herokuapp.com/#/forgot/${hex}/${user.username}`, // plain text body
    html: `
              <h1>https://primephotochallenge.herokuapp.com/#/forgot/${hex}/${user.username}<ha>
          `, // html body
  });
};
