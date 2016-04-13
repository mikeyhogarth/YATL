'use strict'

const mongoose  = require('mongoose');
const schema    = require('./schemas/todo');

module.exports = mongoose.model('Todo', schema);
