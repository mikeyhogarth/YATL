var TodosController = require('../controllers/todos');

module.exports.mount = function(app) { 

  // Todo Routes
  app.get('/todos/:id', TodosController.show);
  app.get('/todos', TodosController.index);
  app.post('/todos', TodosController.create);
  app.put('/todos/:id', TodosController.update);
  app.delete('/todos/:id', TodosController.destroy);

}
