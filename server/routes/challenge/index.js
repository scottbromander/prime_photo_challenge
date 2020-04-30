const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

module.exports = (param) => {
  router.get('/', (req, res) => {
    const queryString = `SELECT * FROM "challenge";`;

    pool
      .query(queryString)
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(`Error getting challenges: ${err}`);
        res.sendStatus(500);
      });
  });

  return router;
};
