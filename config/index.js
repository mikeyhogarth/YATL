module.exports = {
  "development": {
    "db_host": process.env.DB_HOST
  },
  "test": {
    "db_host": process.env.TEST_DB_HOST
  },
  "production": {
    "db_host": process.env.DB_HOST
  }
}

