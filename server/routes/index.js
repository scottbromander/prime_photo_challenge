const express = require('express');
const router = express.Router();

const userRouter = require('./user/index');
const photoRouter = require('./photo/index');
const challengeRouter = require('./challenge/index');
const submissionRouter = require('./submission/index');

module.exports = (param) => {
  router.use('/user', userRouter());
  router.use('/photo', photoRouter());
  router.use('/challenges', challengeRouter());
  router.use('/submissions', submissionRouter());

  return router;
};
