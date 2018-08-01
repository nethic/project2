var db = require("../models");
var matches = require('./externalAPIroutes');

module.exports = function(app) {

  // Get upcoming matches
  app.get("/api/matches", function(req, res) {
    matches.forEach(function(data) {
      db.Matches.upsert(data).then(function(dbMatches) {
        res.json(dbMatches);
      });
    });
  });

  // Create a new wager
  app.post("/api/wager", function(req, res) {
    db.Wager.create(req.body).then(function(dbWagers) {
      res.json(dbWagers);
    });
  });

  // Delete an example by id
  app.delete("/api/account/:id", function(req, res) {
    db.Accounts.destroy({ where: { id: req.params.id } }).then(function(dbAccounts) {
      res.json(dbAccounts);
    });
  });

};
