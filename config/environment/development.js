require('dotenv').config();

module.exports = {
  env: "development",
  port: 3000,
  db_host: process.env.MONGO_URI
}
