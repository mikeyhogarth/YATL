var mongoose  = require('mongoose');

var schema = new mongoose.Schema({ 
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  }});

var Todo = mongoose.model('Todo', schema);

module.exports = Todo;
