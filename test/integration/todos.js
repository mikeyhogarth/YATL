'use strict'

const req           = require('supertest');
const Todo          = require('../../models/todo');
const requestHelper = require('../helpers/request_helper');

describe('Todo Integration Tests', function() {
  let server;
  let currentTodo;
  const todoParams = { todo: { title: "Test", description: "Test" } };

  // 
  // Support methods - consider extracting in the future
  //
  function createTodoRecord(done) {
    const t = new Todo(todoParams.todo);
    t.save(function(err, todo) { 
      currentTodo = todo;
      done(); 
    });
  }

  function teardownTodos(done) {
    Todo.remove({}, () => done());
  }

  function expectNoTodos(done) {
    Todo.count().then(function(cnt) { cnt.should.equal(0); done();});
  }

  function expectOneTodo(done) {
    Todo.count().then(function(cnt) { cnt.should.equal(1); done();});
  }

  // Set up a dummy server to send requests to
  before(() => server = require('../../app'));

  // Close dummy server down when we are done
  after(() => server.close());

  //
  // #index tests 
  //
  describe('#index', function() {
    describe('unauthenticated', function() {
      it('does not allow access', function(done) {
        req(server).get('/todos').expect(401, done);        
      });
    });

    describe('with no records', function() {
      it('returns an empty array', function(done) {
        requestHelper.getWithAuth(req, server, '/todos').expect(200).expect([], done)
      });
    });

    describe('with a record', function() {
      beforeEach(createTodoRecord);
      afterEach(teardownTodos);

      function responseContainsRecord(res) {
        res.body.should.have.length(1);
        res.body[0].title.should.equal(currentTodo.title);
        res.body[0].description.should.equal(currentTodo.description);
      }

      it('lists the records', function(done) {
        requestHelper.getWithAuth(req, server, '/todos').expect(200).expect(responseContainsRecord).end(done);
      });

    });

    describe('pagination of three records', function() {
      // Create three todos
      beforeEach(function(done) {
        const todos = [{title:"1",description:"1"},{title:"2",description:"2"},{title:"3",description: "3"}];
        Todo.create(todos, done);
      });
      afterEach(teardownTodos);

      describe('with a page limit of two', function() {
        describe('page one', function() {
          it('contains two records', function(done) {
            requestHelper.getWithAuth(req, server, '/todos?page=1&limit=2')
              .expect(res => res.body.should.have.length(2))
              .end(done);    
          });
        });

        describe('page two', function() {
          it('contains one record', function(done) {
            requestHelper.getWithAuth(req, server, '/todos?page=2&limit=2')
              .expect(res => res.body.should.have.length(1))
              .end(done);    
          });
        });
      });
    });
  });

  //
  // #show tests 
  //
  describe('#show', function() {
    beforeEach(createTodoRecord);
    afterEach(teardownTodos);

    describe('when no record is present', function() {
      it('returns a 404', function(done) {
        requestHelper.getWithAuth(req, server, '/todos/12345').expect(404, done);
      });
    });

    describe('when record is present', function() {

      function responseContainsCurrentRecord(res) {
        res.body.title.should.equal(currentTodo.title);
        res.body.description.should.equal(currentTodo.description);  
      }

      it('returns the record', function(done) {
        requestHelper.getWithAuth(req, server,'/todos/' + currentTodo.id).expect(200).expect(responseContainsCurrentRecord).end(done);
      });
    });
    
  });


  //
  // #create tests 
  //
  describe('#create', function() {
    afterEach(teardownTodos);
    beforeEach(expectNoTodos);

    function responseContainsRecord(res) {
      res.body.title.should.equal(todoParams.todo.title);
      res.body.description.should.equal(todoParams.todo.description);
    }

    describe('with valid parameters', function() {
      afterEach(expectOneTodo);

      it('creates the record', function(done) {
        requestHelper.postWithAuth(req, server, '/todos').send(todoParams).expect(responseContainsRecord).expect(201, done)
      });
    });

    describe('with invalid parameters', function() {
      afterEach(expectNoTodos);

      it('returns a 400', function(done) {
        requestHelper.postWithAuth(req, server, '/todos').expect(400, done);
      });
    });
  });


  //
  // #update tests 
  //
  describe('#update', function() {
    afterEach(teardownTodos);
    beforeEach(createTodoRecord);

    var newTodoParams = { todo: { title: "Test2", description: "Test2" } };

    function responseContainsUpdatedRecord(res) {
      res.body.title.should.equal(newTodoParams.todo.title);
      res.body.description.should.equal(newTodoParams.todo.description);
    }

    describe('with valid parameters', function() {
      afterEach(expectOneTodo);

      it('updates the record', function(done) {
        requestHelper.putWithAuth(req, server, '/todos/' + currentTodo.id)
          .send(newTodoParams)
          .expect(responseContainsUpdatedRecord)
          .expect(200, done)
      });
    });

    describe('with invalid parameters', function() {
      afterEach(expectOneTodo);
      
      var invalidTodoParams = { todo: { title: "", description: "" } };

      it('returns a 400', function(done) {
        requestHelper.putWithAuth(req, server, '/todos/' + currentTodo.id)
          .send(invalidTodoParams)
          .expect(400, done);
      });
    });
  });


  //
  // #destroy tests 
  //
  describe('#destroy', function() {
    beforeEach(createTodoRecord);
    afterEach(teardownTodos);

    describe('when no record is present', function() {
      it('returns a 404', function(done) {
        requestHelper.deleteWithAuth(req, server, '/todos/12345')
          .expect(404, done);
      });
    });

    describe('when record is present', function() {
      beforeEach(expectOneTodo);
      afterEach(expectNoTodos);

      it('returns no content', function(done) {
        requestHelper.deleteWithAuth(req, server, '/todos/' + currentTodo.id)
          .expect(204, done);
      });
    });
  });
});
