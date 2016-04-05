if(process.env.NODE_ENV == 'development' || process.env.NODE_ENV == 'test') {
  require('dotenv').config();
}

module.exports = ({
  "development": {
    "db_host": process.env.DB_HOST,
    "port": 3000
  },
  "test": {
    "db_host": process.env.TEST_DB_HOST, 
    "port": 3001
  },
  "production": {
    "db_host": process.env.DB_HOST
  }
})[process.env.NODE_ENV || "development"]
