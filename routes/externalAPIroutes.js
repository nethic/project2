require("dotenv").config();
var rp = require("request-promise");
var db = require("../models"); //added because db was not defined

var matchesArr = [];

var options = {
  headers: {
    "User-Agent": "Request-Promise"
  },
  json: true // Automatically parses the JSON string in the response
};

module.exports = {
  newMatches: function(callback) {
    options.uri = `https://api.pandascore.co/ow/matches/upcoming?token=${process.env.PANDA_KEY}`;
    rp(options).then(function(matches) {
      for (i = 0; i < 5; i++) {
        var tempMatch = {
          match_id: matches[i].id,
          match_name: matches[i].name,
          match_start: matches[i].begin_at,
          team_A: matches[i].opponents[0].opponent.name,
          team_B: matches[i].opponents[1].opponent.name
        };
        matchesArr.push(tempMatch);
      }
      callback(matchesArr);
    });
  },
  matchStatus: function(matchID, callback) {
    options.uri = `https://api.pandascore.co/ow/matches?token=${process.env.PANDA_KEY}&filter[id]=${matchID}`;
    console.log(options.uri);
    rp(options).then(function(match) {
      callback(match[0].status, match[0].winner);
    });
  }
};
