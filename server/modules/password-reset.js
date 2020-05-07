const nodemailer = require('nodemailer');
const pool = require('./pool');

function makeid(length) {
  let result = '';
  const characters = 'abcdef0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

module.exports = async (res, email) => {
  const findUserQueryString = `SELECT * FROM "user" WHERE "email"=$1;`;
  const passwordResetQueryString = `INSERT INTO "password_reset" ("hex", "user") VALUES ($1,$2);`;

  try {
    const response = await pool.query(findUserQueryString, [email]);
    if (response.rows == 0) res.send(200);
    const user = response.rows[0];
    const hex = makeid(8);
    await pool.query(passwordResetQueryString, [hex, user.id]);

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
    res.sendStatus(200);
  } catch (error) {
    console.warn(error);
    res.sendStatus(500);
  }
};
