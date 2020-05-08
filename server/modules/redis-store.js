const redis = require('promise-redis')();
const client = redis.createClient();

client.on('connect', () => {
  console.log(`Redis Connected!`);
});

// function createHex(hex) {
//   client.rpush(['hexlist', hex], function (err, reply) {
//     client.lrange('hexlist', 0, -1, function (err, reply) {
//       // reply[reply.length - 1].expire()
//       console.log(reply);
//     });
//   });
// }

// function searchHex(searchHex) {
//   await client.lrange('hexlist', 0, -1, function (err, hexList) {
//     for (let singleHex of hexList) {
//       if (singleHex === searchHex) {
//         client.LREM();
//         return true;
//       }
//     }
//   });
// }

function createHex(user, hex) {
  client
    .hmset('reset', { [user]: hex })
    .then((result) => {
      console.log(result);
    })
    .catch((err) => console.warn(err));
}

function findAndDeleteKey(user, hex) {
  client
    .hget('reset', user)
    .then((result) => {
      if (result === hex) {
        console.log('Yerp');
        client
          .hdel('reset', user)
          .then((response) => {
            console.log('deleted');
          })
          .catch((err) => console.log(err));
      } else {
        console.log('Nerp');
      }
    })
    .catch((err) => console.warn(err));
}

// createHex('scottbromander', '1ac3g6');
// createHex('scottbromander', '1ac3g7');
createHex('scottbromander', '1ac3g8');
createHex('scottbromander', '1ac3g9');
findAndDeleteKey('scottbromander', '1ac3g9');
