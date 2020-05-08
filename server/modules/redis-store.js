const redis = require('promise-redis')();

let client;
if (process.env.REDIS_URL) {
  let rtg = require('url').parse(process.env.REDIS_URL);
  client = redis.createClient(rtg.port, rtg.hostname);
  client.auth(rtg.auth.split(':')[1]);
} else {
  redis.createClient();
}

client.on('connect', () => {
  console.log(`Redis Connected!`);
});

module.exports = client;
