var mongoose = require('mongoose');
var Todo     = require('../../models/todo');
var config   = require('../../config').test;

describe('Todo Model', function() {
  var currentTodo = null;

  // 
  // Before hooks
  //
  before(function(done) { 
    mongoose.createConnection(config.db_host);  
    done();
  });

  beforeEach(function(done) {
    t = new Todo({title: "Test", description: "Test"});
    t.save(function(err, todo) {
      currentTodo = todo;
      done();
    });
  });

  //
  // After hooks
  //
  after(function(done) { 
    mongoose.connection.close();
    done();
  });

  afterEach(function(done) { 
    Todo.remove({}, function() {
      done();
    });
  });


  //
  // Validation Tests
  // 
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