const express = require('express');
const router = express.Router();

const userRouter = require('./user/user.router');
const photoRouter = require('./photo');
const challengeRouter = require('./challenge');
const submissionRouter = require('./submission');

module.exports = (param) => {
  router.use('/user', userRouter());
  router.use('/photo', photoRouter());
  router.use('/challenges', challengeRouter());
  router.use('/submissions', submissionRouter());

  return router;
};
