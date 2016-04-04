var envvar   = require('dotenv').config();

module.exports = {
  "development": {
    "db_host": process.env.DB_HOST || 'mongodb://localhost/'
  },
  "test": {
    "db_host": process.env.TEST_DB_HOST || 'mongodb://localhost/' 
  },
  "production": {
    "db_host": process.env.DB_HOST || 'mongodb://localhost/'
  }
}

