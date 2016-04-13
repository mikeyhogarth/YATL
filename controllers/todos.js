'use strict'
const Todo = require('../models/todo');

/*
 *  GET /todos
 */
module.exports.index = function(req, res) { 
  Todo.paginate(filterOptions(req), pageOptions(req))
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

/*
 * pageOptions
 */ 
function pageOptions(request) {
  const paginationOpts = {};

  if(request.query.page)
    paginationOpts.page = parseInt(request.query.page, 10);

  if(request.query.limit)
    paginationOpts.limit = parseInt(request.query.limit, 10);
  
  if(request.query.sort)
    paginationOpts.sort = request.query.sort;

  return paginationOpts;
}

function filterOptions(request) {
  const filter = {};
  if(request.query.filter) {
    request.query.filter.fields.split().forEach(function(field) {
      filter[field] = request.query.filter.query;
    });
  }
  return filter;
}
