const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const encryptLib = require('../../modules/encryption');
const pool = require('../../modules/pool');
const userStrategy = require('../../strategies/user.strategy');
const passwordReset = require('../../modules/password-reset');
const moment = require('moment');

const router = express.Router();

module.exports = (params) => {
  router.get('/', rejectUnauthenticated, (req, res) => {
    res.send(req.user);
  });

  router.post('/register', (req, res, next) => {
    const { username, email } = req.body;
    const password = encryptLib.encryptPassword(req.body.password);

    const queryText =
      'INSERT INTO "user" (username, password, email) VALUES ($1, $2, $3) RETURNING id';
    pool
      .query(queryText, [username, password, email])
      .then(() => res.sendStatus(201))
      .catch(() => res.sendStatus(500));
  });

  router.post('/login', userStrategy.authenticate('local'), (req, res) => {
    res.sendStatus(200);
  });

  router.post('/forgot', (req, res, next) => {
    passwordReset(res, req.body.email);
  });

  router.put('/reset/password', (req, res, next) => {
    if (!req.body.hex || req.body.hex.length != 8) res.sendStatus(401);

    const hex = req.body.hex;
    const queryString = `SELECT * FROM "password_reset" WHERE "password_reset"."hex"=$1;`;

    pool
      .query(queryString, [hex])
      .then((response) => {
        if (response.rows.length === 0) {
          return res.sendStatus(401);
        }

        const resetKey = response.rows[0];
        const generatedTime = moment(resetKey.date); // timestamp of key
        const currentTime = moment(Date.now()); // current time
        const diff = generatedTime.diff(currentTime, 'minutes'); // find the difference
        const timeDiff = -10; // threshold in minutes

        if (diff > timeDiff && req.body.newPassword && req.body.user) {
          const newPassword = encryptLib.encryptPassword(req.body.newPassword);
          const updateQueryString = `UPDATE "user" SET "password"=$1 WHERE "username"=$2;`;

          pool
            .query(updateQueryString, [newPassword, req.body.user])
            .then((response) => {
              res.sendStatus(200);
            })
            .catch((err) => {
              console.log(`Error saving new password: ${err}`);
              res.sendStatus(500);
            });
        } else {
          res.sendStatus(401); // missing part of the reset cred
        }
      })
      .catch((err) => {
        console.log(err);
        res.sendStatus(500);
      });
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
