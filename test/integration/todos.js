var req = require('supertest');
var Todo = require('../../models/todo');

describe('Todo Integration Tests', function() {
  var server;
  var currentTodo;
  var todoParams = { todo: { title: "Test", description: "Test" } };

  // 
  // Support methods - consider extracting in the future
  //
  function createTodoRecord(done) {
    t = new Todo({title: "Test", description: "Test"});
    t.save(function(err, todo) { 
      currentTodo = todo;
      done(); 
    });
  }

  function teardownTodos(done) {
    Todo.remove({}, function() { done(); });
  }

  function expectNoTodos(done) {
    Todo.count().then(function(cnt) { cnt.should.equal(0); done();});
  }

  function expectOneTodo(done) {
    Todo.count().then(function(cnt) { cnt.should.equal(1); done();});
  }


  // Set up a dummy server to send requests to
  before(function() {
    server = require('../../app');
  });

  // Close dummy server down when we are done
  after(function() {
    server.close();
  });

  //
  // #index tests 
  //
  describe('#index', function() {

    describe('with no records', function() {
      it('returns an empty array', function(done) {
        req(server).get('/todos').expect(200).expect([], done)
      });
    });

    describe('with a record', function() {
      beforeEach(createTodoRecord);
      afterEach(teardownTodos);

      function responseContainsRecord(res) {
        res.body.should.have.length(1);
        res.body[0].should.have.property("title");
        res.body[0].title.should.equal(currentTodo.title);
        res.body[0].description.should.equal(currentTodo.description);
      }

      it('lists the records', function(done) {
        req(server).get('/todos').expect(200).expect(responseContainsRecord).end(done);
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
        req(server).get('/todos/12345').expect(404, done);
      });
    });

    describe('when record is present', function() {
      function responseContainsRecord(res) {
        res.body.title.should.equal(currentTodo.title);
        res.body.description.should.equal(currentTodo.description);
      }

      it('returns the record', function(done) {
        req(server).get('/todos/' + currentTodo.id).expect(200).expect(responseContainsRecord).end(done);
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
        req(server).post('/todos').send(todoParams).expect(responseContainsRecord).expect(201, done)
      });
    });

    describe('with invalid parameters', function() {
      afterEach(expectNoTodos);

      it('returns a 400', function(done) {
        req(server).post('/todos').expect(400, done);
      });
    });
  });
});
