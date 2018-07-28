const db = require('../models');
const path = require('path');

// <Table Names> Accounts / Matches / Wagers (current & past wagers)

module.exports = function (app) {
  // Get all examples
  app.get('/api/current', function(req, res) {
    db.matches.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/examples", function (req, res) {
    db.Example.create(req.body).then(function(dbExample) {
      res.json(dbExample);
    });
  });

  // Delete an example by id
  app.delete("/api/examples/:id", function (req, res) {
    db.Example.destroy({ where: { id: req.params.id } }).then(function(dbExample) {
      res.json(dbExample);
    });
  });
};
