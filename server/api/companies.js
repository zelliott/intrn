import Company from '../models/company';
import Metric from '../models/metric';
import Role from '../models/role';
import express from 'express';
import morgan from 'morgan';
import moment from 'moment';
import _ from 'lodash';
import mongoose from 'mongoose';

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

  // Create a Company (accessed at POST http://localhost:8080/api/companies)
  .post(function(req, res) {
    Company.findOne({ name: req.body.name }, function(err, company) {
      const _metrics = ['salary', 'funness', 'perks', 'difficulty'];

      if (company) {

        // If a company is found
        _.each(_metrics, metric => {

          if (req.body[metric]) {

            // FIXME: http://stackoverflow.com/questions/7267102/how-do-i-update-upsert-a-document-in-mongoose
            // Way too many MongoDB calls...
            Metric.findOne({ '_id': new mongoose.Types.ObjectId(company[metric]) }, (err, metricModel) => {

              let size = ++metricModel.statistics[0].size;
              let mean = metricModel.statistics[0].mean;

              metricModel.statistics[0].size = size;
              metricModel.statistics[0].mean = ((size - 1) / size) * (mean) + (1 / size) * req.body[metric];

              metricModel.values.push({
                timestamp: new Date().getTime(),
                value: req.body[metric]
              });

              metricModel.save();
            });
          }
        });

        if (req.body.role) {
          Role.findOne({ 'name': req.body.role }, (err, role) => {
            if (!_.contains(company.roles, role)) {
              company.roles.push(role._id);
              role.count++;
              role.save();
              company.save();
            }
          });
        }

      } else {

        // If no company is found, create it
        _.each(_metrics, metric => {

          let statistics = [];
          let values = [];

          if (req.body[metric]) {
            statistics.push({
              timestamp: new Date().getFullYear(),
              size: 1,
              mean: req.body[metric]
            });

            values.push({
              timestamp: new Date().getTime(),
              value: req.body[metric]
            });
          } else {
            statistics.push({
              size: 0,
              mean: 0,
              timestamp: new Date().getFullYear()
            });
          }

          let MetricModel = new Metric({
            statistics: statistics,
            values: values
          });

          MetricModel.save();

          req.body[metric] = MetricModel._id;
        });

        if (req.body.role) {
          Role.findOne({ 'name': req.body.role }, (err, role) => {
            role.count++;
            role.save();
            req.body.roles = [role._id];
          });
        }

        Company.create(req.body, function(err, company) {
          if (err) return errorHandler(res, err);

          res.json(company);
        });
      }
    });
  })

  // get all the Companies (accessed at GET http://localhost/api/companies)
  .get(function(req, res) {
    Company.find()
      .populate('salary')
      .populate('funness')
      .populate('perks')
      .populate('difficulty')
      .populate('roles')
      .exec(function(err, companies) {
        if (err) return errorHandler(res, err);

        res.json(companies);
      });
  });

router.route('/companies/names')

  // get all the Companies (accessed at GET http://localhost/api/companies)
  .get(function(req, res) {
    Company.find({}, 'name', function(err, companies) {
      if (err) return errorHandler(res, err);

      res.json(companies);
    });
  });

router.route('/companies/:company_name')

  // get the Company with that name (accessed at GET http://localhost:8080/api/companies/:company_name)
  .get(function(req, res) {
    Company.findOne({name: req.params.name}, function(err, company) {
      if (err) return errorHandler(res, err);

      if (!company) return notFoundHandler(res);

      res.json(company);
    });
  })
export default router;
