const pgp = require('pg-promise')();

const connectionSettings = {
  host: 'localhost',
  port: 5432,
  database: 'tv_time_db',
  user: 'glennfriedman'
}

const db = pgp(connectionSettings);
module.exports = db;
