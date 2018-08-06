var db = require("../models");
var matchesExternal = require("./externalAPIroutes");

module.exports = function(app) {
  // Update upcoming matches from external API
  app.get("/api/matches/update", async function(req, res) {
    await matchesExternal.newMatches(function(data) {
      var matches = data;
      matches.forEach(function(match) {
        db.Matches.upsert(match);
      });
    });
    res.end();
  });

  // Send upcoming matches to client
  app.get("/api/matches/view", function(req, res) {
    db.Matches.findAll({
      limit: 5,
      order: [["createdAt", "DESC"]]
    }).then(function(dbMatches) {
      res.json(dbMatches);
    });
  });

  // Create a new wager
  app.post("/api/wager", function(req, res) {
    matchesExternal.matchStatus(req.body.match_id, async function(status) {
      if (status === "not_started") {
        var wagerObj = {
          wager_team: req.body.wager_team,
          wager_amount: req.body.wager_amount,
          account_id: req.body.account_id,
          match_id: req.body.match_id
        }
        await db.Wagers.create(wagerObj).then(function() {
          res.json( { message: "Wager accepted!" } );
        });
        db.Matches.findOne({
          where: {
            match_id: req.body.match_id
          }
        }).then(function(data) {
          console.log(data);
          if (req.body.wager_team === data.team_A) {
            var new_A_wagers = data.team_A_wagers + req.body.wager_amount;
            var new_B_wagers = data.team_B_wagers;
          } else if (req.body.wager_team === data.team_B) {
            var new_B_wagers = data.team_B_wagers + req.body.wager_amount;
            var new_A_wagers = data.team_A_wagers;
          }
          var new_A_odds = (new_A_wagers + new_B_wagers) / new_A_wagers;
          var new_B_odds = (new_B_wagers + new_A_wagers) / new_B_wagers;
          db.Matches.update(
            {
              team_A_wagers: new_A_wagers,
              team_B_wagers: new_B_wagers,
              team_A_odds: new_A_odds,
              team_B_odds: new_B_odds
            },
            {
              where: {
                match_id: req.body.match_id
              }
            }
          );
        });
        // --------------------------------------------------
        // Update user account points here when accounts are implemented
        // --------------------------------------------------
      } else if (status === "finished") {
        db.Matches.update(
          {
            match_status: "finished",
            match_winner: data.winner.name
          },
          {
            where: {
              match_id: req.body.match_id
            }
          }
        ).then(function() {
          res.json( { message: "That match has already begun!" } );
        });
      }
    });
  });

  // Delete account by id
  app.delete("/api/account/delete/:id", function(req, res) {
    db.Accounts.destroy({ where: { id: req.params.id } }).then(function(dbAccounts) {
      res.json(dbAccounts);
    });
  });
};
