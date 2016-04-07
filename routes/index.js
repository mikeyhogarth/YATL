var TodosController = require('../controllers/todos');
var router          = require('express').Router();

// Todo Routes
router.get('/todos/:id',    TodosController.show);
router.get('/todos',        TodosController.index);
router.post('/todos',       TodosController.create);
router.put('/todos/:id',    TodosController.update);
router.delete('/todos/:id', TodosController.destroy);

module.exports = router
