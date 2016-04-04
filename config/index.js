var envvar   = require('dotenv').config();

module.exports = {
  "development": {
    "db_host": process.env.DB_HOST || 'mongodb://localhost/',
    "port": 3000
  },
  "test": {
    "db_host": process.env.TEST_DB_HOST || 'mongodb://localhost/', 
    "port": 3001
  },
  "production": {
    "db_host": process.env.DB_HOST || 'mongodb://localhost/'
  }
}

