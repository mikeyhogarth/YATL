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
    renderResource.bind(null, res, 200), 
    err => handleError.call(res, err, 404)
  )
}

/*
 * PUT /todos/:id
 */ 
module.exports.update = function(req, res) {
  Todo.findById(req.params.id).then(todo => {
    todo.set(todoParams(req));
    todo.save().then(
      renderResource.bind(null, res, 200),
      err => handleError.call(res, err, 400)
    );
  });
}

/*
 * POST /todos
 */
module.exports.create = function(req, res) {
  const todo = new Todo(todoParams(req));
  todo.save().then(
    renderResource.bind(null, res, 201),
    err  => handleError.call(res, err, 400)
  )
}

/*
 * DELETE /todos/:id
 */ 
module.exports.destroy = function(req, res) {
  Todo.findById(req.params.id).remove().then(
    renderResource.bind(null, res, null, 204), 
    err  => handleError.call(res, err, 404)
  )
}


/*
 * todoParams
 */
function todoParams(req) {
  return req.body.todo;
}

/*
 * renderResource
 */ 
function renderResource(response, statusCode, resource) {
  response.status(statusCode || 200);
  response.send(resource);
}

/*
 * handleError
 */
function handleError(err, statusCode) {
  this.status(statusCode || 500);
  this.send(err);
}
