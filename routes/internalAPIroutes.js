var db = require("../models");
var matchesExternal = require("./externalAPIroutes");

module.exports = function(app) {
  // Update upcoming matches from external API
  app.get("/api/matches/update", async function(req, res) {
    await matchesExternal.newMatches(function(data) {
      var matches = data;
      console.log(matches);
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
  app.post("/api/wager/place", function(req, res) {
    matchesExternal.matchStatus(req.body.match_id, async function(status, winner) {
      if (status === "not_started") {
        var wagerObj = {
          wager_team: req.body.wager_team,
          wager_amount: req.body.wager_amount,
          match_id: req.body.match_id,
          accound_id: req.body.account_id
        }
        await db.Wagers.create(wagerObj, {
          include: [db.Matches, db.Accounts]
        }).then(function() {
          res.json( { message: "Wager accepted!" } );
        });
        db.Matches.findOne({
          where: {
            match_id: req.body.match_id
          }
        }).then(function(data) {
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
        // ==============================================================
        // Update user account points here when accounts are implemented
        // ==============================================================
      } else if (status === "finished") {
        db.Matches.update(
          {
            match_status: "finished",
            match_winner: winner.name
          },
          {
            where: {
              match_id: req.body.match_id
            }
          }
        ).then(function() {
          res.json({
            message: "That match has already finished!"
          });
        });
      }
    });
  });

  // View all wagers
  app.get("/api/wagers/view", function(req, res) {
    db.Wagers.findAll().then(function(data) {
      res.json(data);
    });
  });

  // Update wager result and associated models
  // ===========================================
  // Incorporate user accounts when implemented
  // ===========================================
  app.put("/api/wager/update", function(req, res) {
    db.Wagers.findOne({
      where: {
        wager_id: req.body.wager_id
      }
    }).then(function(wager) {
      matchesExternal.matchStatus(wager.match_id, function(status, winner) {
        if (status === "finished") {
          db.Matches.update(
            {
              match_status: "finished",
              match_winner: winner.name
            },
            {
              where: {
                match_id: wager.match_id
              }
            }
          ).then(function() {
            if (wager.wager_team === winner.name) {
              db.Matches.findOne({
                where: {
                  match_id: wager.match_id
                }
              }).then(function(match) {
                if (winner.name === match.team_A) {
                  var winnings = wager.wager_amount * match.team_A_odds;
                } else if (winner.name === match.team_B) {
                  var winnings = wager.wager_amount * match.team_A_odds;
                }
                res.json({
                  message: `You won ${winnings}!`
                });
              });
            } else if (wager.wager_team !== winner.name) {
              res.json({
                message: "You lost. Better luck next time!"
              });
            }
          });
        } else if (status !== "finished") {
          res.json({
            message: "That match hasn't finished yet!"
          });
        }
      });
    });
  });

  /*
  // Delete account by id
  app.delete("/api/account/delete/:id", function(req, res) {
    db.Accounts.destroy({ where: { id: req.params.id } }).then(function(dbAccounts) {
      res.json(dbAccounts);
    });
  });
  */
};
