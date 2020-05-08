const express = require('express');

//Data
const pool = require('../../modules/pool');
const redisClient = require('../../modules/redis-store');

// Forgot Password
const makeid = require('../../modules/password-reset');
const mailerForgotPassword = require('../../modules/mailer-forgot-password');

// Auth
const encryptLib = require('../../modules/encryption');
const userStrategy = require('../../strategies/user.strategy');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');

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

  router.post('/forgot', async (req, res, next) => {
    const findUserQueryString = `SELECT * FROM "user" WHERE "email"=$1;`;

    try {
      const response = await pool.query(findUserQueryString, [req.body.email]);
      if (response.rows == 0) res.send(200);

      const user = response.rows[0];
      const hex = makeid(8); // 8 character hex code

      redisClient
        .hmset(user.username, { ['hex']: hex })
        .then(async (result) => {
          redisClient.expire(user.username, 60 * 5); // 60 seconds * 5 = 5 minutes

          try {
            await mailerForgotPassword(user, hex);
            res.sendStatus(200);
          } catch (error) {
            res.sendStatus(500);
          }
        })
        .catch((err) => res.sendStatus(500));
    } catch (error) {
      res.sendStatus(500);
    }
  });

  router.put('/reset/password', (req, res, next) => {
    if (!req.body.hex || req.body.hex.length != 8) res.sendStatus(401);
    const hex = req.body.hex;

    redisClient
      .hget(req.body.user, 'hex')
      .then((response) => {
        if (
          !response ||
          response !== hex ||
          !req.body.newPassword ||
          !req.body.user
        )
          return res.sendStatus(401);

        const newPassword = encryptLib.encryptPassword(req.body.newPassword);
        const updateQueryString = `UPDATE "user" SET "password"=$1 WHERE "username"=$2;`;

        pool
          .query(updateQueryString, [newPassword, req.body.user])
          .then((response) => res.sendStatus(200))
          .catch((err) => res.sendStatus(500));
      })
      .catch((err) => res.sendStatus(500));
  });

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
