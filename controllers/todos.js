'use strict'

const Todo = require('../models/todo');

/*
 *  GET /todos
 */
module.exports.index = function(req, res) { 
  Todo.find({}).then(todos => res.send(todos), handleError.bind(res)); 
}

/*
 * GET /todos/:id
 */
module.exports.show = function(req, res) {
  Todo.findById(req.params.id).then(
    todo => { res.send(todo) }, 
    err  => { handleError(res, err, 404) }
  )
}

/*
 * PUT /todos/:id
 */ 
module.exports.update = function(req, res) {
  Todo.findById(req.params.id, function(err, todo) {
    todo.set(todoParams(req));
    todo.save().then(
      todo => { res.send(todo) },
      err  => { handleError(res, err, 400) }
    );
  });
}

/*
 * POST /todos
 */
module.exports.create = function(req, res) {
  const todo = new Todo(todoParams(req));
  todo.save().then(
    todo => {
      res.status(201);
      res.send(todo);
    },
    err  => { handleError(res, err, 400) }
  )
}

/*
 * DELETE /todos/:id
 */ 
module.exports.destroy = function(req, res) {
  Todo.findById(req.params.id).remove().then(
    todo => { 
      res.status(204);
      res.send(null);
    },
    err  => { handleError(res, err, 404) }
  )
}


/*
 * todoParams
 */
function todoParams(req) {
  return req.body.todo;
}

function handleError(res, err, statusCode) {
  res.status(statusCode || 500);
  res.send(err);
}
