import Company from '../models/company';
import express from 'express';
import morgan from 'morgan';

const router = express.Router();

// log all requests to the console
router.use(morgan('dev'));

function notFoundHandler(res) {
  return res.status(404).send('Metric could not be found!');
}

function errorHandler(res, err) {
  return res.status(500).send(err);
}

router.route('/metrics/:metric_id')

  // get the Company with that id (accessed at GET http://localhost:8080/api/companies/:company_id)
  .get(function(req, res) {
    Company.findOne({id: req.params.company_id}, function(err, company) {
      if (err) return errorHandler(res, err);

      if (!company) return notFoundHandler(res);

      res.json(company);
    });
  })
/*
  // update the todo with this id (accessed at PUT http://localhost:8080/api/todos/:todo_id)
  .put(function(req, res) {
    Todo.update({id: req.params.todo_id}, req.body, function(err, todo) {
      if (err) return errorHandler(res, err);

      if (!todo) return notFoundHandler(res);

      res.json(todo);
    });
  })

  // delete the todo with this id (accessed at DELETE http://localhost:8080/api/todos/:todo_id)
  .delete(function(req, res) {
    Todo.remove({
      id: req.params.todo_id
    }, function(err, todo) {
      if (err) return errorHandler(res, err);

      if (!todo) return notFoundHandler(res);

      res.json(todo);
    });
  });
*/
export default router;
