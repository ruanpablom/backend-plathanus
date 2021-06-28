// eslint-disable-next-line import/order
const config = require('./env/config')();
const promise = require('bluebird');
// configs to db connection
const options = {
  promiseLib: promise,
};
const pgp = require('pg-promise')(options);

const uuidGenerator = 'SELECT uuid_in(md5(random()::text || now()::text)::cstring)';

function checkdb() {
  if (config.dbURL) {
    return config.dbURL;
  }
  return `postgres://${config.username}:${config.password}@${config.host}:${config.db_port}/${config.db}`;
}

// All configs to DB connection
const connectionString = checkdb();
const db = pgp(connectionString);

module.exports = {
  db,
  uuidGenerator,
  pgp,
};
