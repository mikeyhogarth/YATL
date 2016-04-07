'use strict'

const Todo = require('../models/todo');

/*
 *  GET /todos
 */
module.exports.index = function(req, res) { 
  Todo.find({}, (err, todos) => res.send(err || todos));
}

/*
 * GET /todos/:id
 */
module.exports.show = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    res.status(todo ? 200 : 404);
    res.send(err || todo); 
  });
}

/*
 * PUT /todos/:id
 */ 
module.exports.update = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    todo.set(todoParams(req));
    todo.save(function(err, todo) { 
      res.status(err ? 400 : 200)
      res.send(err || todo); 
    });
  });
};

/*
 * POST /todos
 */
module.exports.create = function(req, res) {
  const todo = new Todo(todoParams(req));
  todo.save(function(err, todo) {
    res.status(err ? 400 : 201)
    res.send(err || todo);
  });
}

/*
 * DELETE /todos/:id
 */ 
module.exports.destroy = function(req, res) {
  Todo.findById(req.params.id).remove(function(err, todo) {
    res.status(err ? 404 : 204)
    res.send(err || null); 
  });
};


/*
 * todoParams
 */
function todoParams(req) {
  return req.body.todo;
}
