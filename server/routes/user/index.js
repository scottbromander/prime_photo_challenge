const express = require('express');
const {
  rejectUnauthenticated,
} = require('../../modules/authentication-middleware');
const encryptLib = require('../../modules/encryption');
const pool = require('../../modules/pool');
const userStrategy = require('../../strategies/user.strategy');

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

  router.post('/logout', (req, res) => {
    req.logout();
    res.sendStatus(200);
  });

  return router;
};
