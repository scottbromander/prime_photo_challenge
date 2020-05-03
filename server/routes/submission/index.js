const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

const {
  STATUS_PENDING_CODE,
  STATUS_ACCEPTED_CODE,
  STATUS_DECLINED_CODE,
} = require('../../modules/enums_status');

module.exports = (params) => {
  router.get('/pending', (req, res) => {
    console.log('in submission router');
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

  router.put('/approve/:id', (req, res) => {
    //UPDATE "songs" SET "rank" = 1 WHERE "track" = 'Wonderwall';
    const queryString = `UPDATE "submission" SET "status"=$1 WHERE "id"=$2;`;

    pool
      .query(queryString, [STATUS_ACCEPTED_CODE, req.params.id])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.warn(`Error accepting submission: ${err}`);
        res.sensStatus(500);
      });
  });

  router.put('/decline/:id', (req, res) => {
    //UPDATE "songs" SET "rank" = 1 WHERE "track" = 'Wonderwall';
    const queryString = `UPDATE "submission" SET "status"=$1 WHERE "id"=$2;`;

    pool
      .query(queryString, [STATUS_DECLINED_CODE, req.params.id])
      .then((response) => {
        res.sendStatus(200);
      })
      .catch((err) => {
        console.warn(`Error declining submission: ${err}`);
        res.sensStatus(500);
      });
  });

  return router;
};
