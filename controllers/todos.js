'use strict'
const Todo = require('../models/todo');

/*
 *  GET /todos
 */
module.exports.index = function(req, res) { 
  Todo.paginate({}, pageOptions(req))
    .then(todos => res.send(todos.docs), handleError.bind(res)); 
}

/*
 * GET /todos/:id
 */
module.exports.show = function(req, res) {
  Todo.findById(req.params.id).then(
    renderResource.bind(null, res, 200), 
    handleError.bind(null, res, 404)
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
      handleError.bind(null, res, 400)
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
    handleError.bind(null, res, 400)
  )
}

/*
 * DELETE /todos/:id
 */ 
module.exports.destroy = function(req, res) {
  Todo.findById(req.params.id).remove().then(
    renderResource.bind(null, res, 204), 
    handleError.bind(null, res, 404)
  )
}


/*
 *
 * END OF PUBLIC INTERFACE
 *
 */


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
function handleError(response, statusCode, err) {
  response.status(statusCode || 500);
  response.send(err);
}

function pageOptions(request) {
  const page  = request.query.page ? parseInt(request.query.page, 10) : 1;
  const limit = request.query.limit ? parseInt(request.query.limit, 10) : 10;
  return { page: page, limit: limit };
}
