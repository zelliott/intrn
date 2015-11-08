import Role from '../models/role';
import express from 'express';
import morgan from 'morgan';

const router = express.Router();

// log all requests to the console
router.use(morgan('dev'));

function notFoundHandler(res) {
  return res.status(404).send('Role could not be found!');
}

function errorHandler(res, err) {
  return res.status(500).send(err);
}

router.route('/roles')

  // create a Role (accessed at POST http://localhost:8080/api/roles)
  .post(function(req, res) {

    // Ids must be a valid UUID
    /* if (!(req.body.id.match(/[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i))) {
      return res.status(400).send('Id is invalid!');
    }*/

    // Create the Role and check for errors
    Role.create(req.body, function(err, role) {
      if (err) return errorHandler(res, err);

      res.json(role);
    });
  })

  // get all the Roles (accessed at GET http://localhost/api/roles)
  .get(function(req, res) {
    Role.find(function(err, roles) {
      if (err) return errorHandler(res, err);

      res.json(roles);
    });
  });

router.route('/roles/:role_id')

  // get the Role with that id (accessed at GET http://localhost:8080/api/roles/:role_id)
  .get(function(req, res) {
    Role.findOne({id: req.params.role_id}, function(err, role) {
      if (err) return errorHandler(res, err);

      if (!role) return notFoundHandler(res);

      res.json(role);
    });
  })

export default router;
