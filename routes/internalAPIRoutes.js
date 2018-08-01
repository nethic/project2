const db = require('../models');
const path = require('path');

// <Table Names> Accounts / Matches / Wagers (current & past wagers)

module.exports = function (app) {
  // Get all examples
  app.get('/api/current', function(req, res) {
    db.Matches.findAll({}).then(function(dbExamples) {
      res.json(dbExamples);
    });
  });

  // Create a new example
  app.post("/api/matches", function (req, res) {

    db.Matches.create(      
      {match_id: req.body.id,
      match_name: req.body.matchName,
      match_start: req.body.matchStart,
      match_end: false,
      team_A: req.body.opponents0,
      team_B: req.body.opponents1}
    ).then(function(dbExample) {
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
