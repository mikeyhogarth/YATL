var envvar   = require('dotenv').config();
var mongoose = require('mongoose');
var Todo     = require('../../models/todo');

mongoose.connect(process.env.TEST_DB_HOST);  

describe('Todo Model', function() {
  var currentTodo = null;

  // Before hook
  beforeEach(function(done) {
    t = new Todo({title: "Test", description: "Test"});
    t.save(function(err, todo) {
      currentTodo = todo;
      done();
    });
  });

  // After hook
  afterEach(function(done) { 
    Todo.remove({}, function() {
      done();
    });
  });

  describe('Validation', function() {
    it('Validates presence of name', function(done) {
      currentTodo.title = null;
      currentTodo.save(function(err) {
        err.errors.title.kind.should.equal('required'); 
        done();
      })
    });

    it('Validates presence of description', function(done) {
      currentTodo.description = null;
      currentTodo.save(function(err) {
        err.errors.description.kind.should.equal('required'); 
        done();
      })
    });
  });
});
