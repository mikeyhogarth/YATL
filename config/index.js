if(process.env.NODE_ENV != 'production') { require('dotenv').config(); }

module.exports = ({
  "development": {
    "env": "development",
    "db_host": process.env.DB_HOST,
    "port": 3000
  },
  "test": {
    "env": "test",
    "db_host": process.env.TEST_DB_HOST, 
    "port": 3001
  },
  "production": {
    "env": "production",
    "db_host": process.env.DB_HOST
  }
})[process.env.NODE_ENV || "development"]
