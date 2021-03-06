'use strict'

const mongoose  = require('mongoose');

const schema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }});

schema.plugin(require('mongoose-paginate'));

module.exports = schema;
