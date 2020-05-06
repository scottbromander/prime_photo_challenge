const express = require('express');
const pool = require('../../modules/pool');
const router = express.Router();

module.exports = (params) => {
  router.get('/', (req, res) => {
    const queryString = `SELECT
      "submission"."challenge_id",
      "submission"."image_url",
      "status"."id",
      "status"."status_name",
      "user"."username",
      "challenge"."description"
      FROM "submission"
      JOIN "status" ON "submission"."status"="status"."id"
      JOIN "user" ON "submission"."user"="user"."id"
      JOIN "challenge" ON "submission"."challenge_id"="challenge"."id"
      WHERE "team_id"=$1
      ORDER BY "status"."id" DESC;`;

    pool
      .query(queryString, [req.user.team])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(`Error in get: ${err}`);
        res.sendStatus(500);
      });
  });

  router.post('/', (req, res) => {
    const queryString = `INSERT INTO "submission" ("user", "team_id", "image_url", "challenge_id") VALUES ($1, $2, $3, $4);`;

    pool
      .query(queryString, [
        req.body.user,
        req.body.team,
        req.body.image_url,
        req.body.challenge_id,
      ])
      .then((response) => {
        res.sendStatus(201);
      })
      .catch((err) => {
        console.warn(`Error posting image: ${err}`);
        res.sendStatus(500);
      });
  });
  return router;
};
