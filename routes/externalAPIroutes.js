require("dotenv").config();
var rp = require("request-promise");

module.exports = function(callback) {
  var matchesArr = [];

  var options = {
    uri: "https://api.pandascore.co/ow/matches/upcoming",
    qs: {
      token: process.env.PANDA_KEY // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true // Automatically parses the JSON string in the response
  };

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
    console.log(matchesArr);
    callback(matchesArr);
  });
};
