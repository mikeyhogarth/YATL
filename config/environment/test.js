require('dotenv').config();

module.exports = {
  env: "test",
  port: 3001,
  db_host: process.env.TEST_DB_HOST, 
}
