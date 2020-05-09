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

  router.get('/approved/all', (req, res) => {
    const queryString = `SELECT * FROM "submission" 
    JOIN "challenge" ON "submission"."challenge_id"="challenge"."id"
    WHERE "submission"."status"=$1;`;

    pool
      .query(queryString, [STATUS_ACCEPTED_CODE])
      .then((response) => {
        res.send(response.rows);
      })
      .catch((err) => {
        console.warn(err);
        res.sendStatus(500);
      });
  });

  router.get('/team/leaderboard', (req, res) => {
    const queryString = `SELECT * FROM "submission" 
      JOIN "team" ON "submission"."team_id"="team"."id"
      WHERE "submission"."status"=$1 
      ORDER BY "submission"."team_id"`;

    pool
      .query(queryString, [STATUS_ACCEPTED_CODE])
      .then((response) => {
        const allApprovedSubmissions = response.rows;
        const leaderBoard = {};

        for (let submission of allApprovedSubmissions) {
          if (!leaderBoard[submission.team_id]) {
            leaderBoard[submission.team_id] = {};
            leaderBoard[submission.team_id].score = 0;
            leaderBoard[submission.team_id].team_id = submission['team_id'];
            leaderBoard[submission.team_id].name = submission['name'];
          }
          leaderBoard[submission.team_id].score++;
        }

        let leaderBoardArray = [];

        for (let key of Object.keys(leaderBoard)) {
          leaderBoardArray.push(leaderBoard[key]);
        }

        function compare(a, b) {
          // Use toUpperCase() to ignore character casing
          const scoreA = parseInt(a.score);
          const scoreB = parseInt(b.score);

          let comparison = 0;
          if (scoreA < scoreB) {
            comparison = 1;
          } else if (scoreA > scoreB) {
            comparison = -1;
          }
          return comparison;
        }

        leaderBoardArray.sort(compare);

        res.send(leaderBoardArray);
      })
      .catch((err) => {
        console.warn(`Error getting leaderboard: ${err}`);
        res.sendStatus(500);
      });
  });

  router.put('/approve/:id', (req, res) => {
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
