const express = require('express');
const router = express.Router();

const userRouter = require('./user/user.router');
const photoRouter = require('./photo');
const challengeRouter = require('./challenge');

module.exports = (param) => {
  router.use('/user', userRouter());
  router.use('/photo', photoRouter());
  router.use('/challenges', challengeRouter());

  return router;
};
