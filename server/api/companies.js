import Company from '../models/company';
import express from 'express';
import morgan from 'morgan';

const router = express.Router();

// log all requests to the console
router.use(morgan('dev'));

function notFoundHandler(res) {
  return res.status(404).send('Company could not be found!');
}

function errorHandler(res, err) {
  return res.status(500).send(err);
}

router.route('/companies')

  // create a Company (accessed at POST http://localhost:8080/api/companies)
  .post(function(req, res) {

    // Ids must be a valid UUID
    /* if (!(req.body.id.match(/[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))) {
      return res.status(400).send('Id is invalid!');
    }*/

    // Create the Company and check for errors
    Company.create(req.body, function(err, company) {
      if (err) return errorHandler(res, err);

      res.json(company);
    });
  })

  // get all the Companies (accessed at GET http://localhost/api/companies)
  .get(function(req, res) {
    Company.find(function(err, companies) {
      if (err) return errorHandler(res, err);

      res.json(companies);
    });
  });

router.route('/companies/:company_id')

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
