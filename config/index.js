'use strict'

if(process.env.NODE_ENV != 'production') { require('dotenv').config(); }

module.exports = ({
  "development": {
    "env": "development",
    "db_host": process.env.DB_HOST,
    "auth_token": process.env.AUTH_TOKEN,
    "port": 3000
  },
  "test": {
    "env": "test",
    "db_host": process.env.TEST_DB_HOST, 
    "auth_token": process.env.AUTH_TOKEN,
    "port": 3001
  },
  "production": {
    "env": "production",
    "auth_token": process.env.AUTH_TOKEN,
    "db_host": process.env.DB_HOST
  }
})[process.env.NODE_ENV || "development"]
