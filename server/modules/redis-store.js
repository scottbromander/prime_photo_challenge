const redis = require('promise-redis')();
const client = redis.createClient();

client.on('connect', () => {
  console.log(`Redis Connected!`);
});

module.exports = client;

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
// // createHex('scottbromander', '1ac3g7');
// createHex('scottbromander', '1ac3g8');
// createHex('scottbromander', '1ac3g9');
// findAndDeleteKey('scottbromander', '1ac3g9');
