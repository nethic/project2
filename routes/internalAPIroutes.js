var db = require("../models");
var matchesExternal = require("./externalAPIroutes");

module.exports = function(app) {
  // Get upcoming matches
  app.get("/api/matches", async function(req, res) {
    await matchesExternal.getMatches(function(data) {
      var matches = data;
      console.log(matches);
      matches.forEach(function(match) {
        db.Matches.upsert(match);
      });
    });
    await db.Matches.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    }).then(function(dbMatches) {
      res.json(dbMatches);
    });
  });

  // Create a new wager
  app.post("/api/wager", function(req, res) {
    db.Wager.create(req.body).then(function(dbWagers) {
      res.json(dbWagers);
    });
  });

  // Delete account by id
  app.delete("/api/account/delete/:id", function(req, res) {
    db.Accounts.destroy({ where: { id: req.params.id } }).then(function(dbAccounts) {
      res.json(dbAccounts);
    });
  });

  app.get("/api/matches/update", function(req, res) {
    matchesExternal.updateMatches(function(data) {
      var matches = data;
      matches.forEach(function(match) {
        db.Matches.upsert(match);
      });
    });
    res.send("Working!");
  });
  
};