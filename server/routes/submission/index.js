const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

const { STATUS_PENDING_CODE } = require('../../modules/enums_status');

module.exports = (params) => {
  router.get('/pending', (req, res) => {
    const queryString = `SELECT 
        "submission"."id",
        "submission"."image_url",
        "status"."status_name",
        "challenge"."description"
        FROM "submission"
        JOIN "challenge" ON "submission"."challenge_id"="challenge"."id"
        JOIN "status" ON "submission"."status"="status"."id"
        WHERE "submission"."status"=$1;
    `;

    pool
      .query(queryString, [STATUS_PENDING_CODE])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(`Error getting approved submissions: ${err}`);
      });
  });

  router.put('/:id', (req, res) => {});

  return router;
};
