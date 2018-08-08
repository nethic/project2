//https://api.pandascore.co/ow/matches/upcoming?
require("dotenv").config();
var request = require('request');
var rp = require('request-promise');

<<<<<<< HEAD
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
=======
// app.get('/api/matches', function(req, res, next) {
//   request({
//     uri: `https://api.pandascore.co/ow/matches/upcoming`,
//     qs: {
//         token: process.env.PANDA_KEY,
//     }
//   });
//   console.log(res);
// });

// app.post("/api/matches", function (req, res) {

// }


module.exports = function(app) {
    var matchObject = []

    app.post('/api/matches', function(req, res, next) {
    var options = {
        uri: 'https://api.pandascore.co/ow/matches/upcoming',
        qs: {
            token: process.env.PANDA_KEY // -> uri + '?access_token=xxxxx%20xxxxx'
        },
        headers: {
            'User-Agent': 'Request-Promise'
        },
        json: true // Automatically parses the JSON string in the response
    };

    rp(options)
        .then(function (matches) {
            for (i = 0; i < 5; i++) {
                var tempMatch = {

                match_id: matches[i].id,
                match_name: matches[i].name,
                match_start: matches[i].begin_at,
                team_A: matches[i].opponents[0].opponent.name,
                team_B: matches[i].opponents[1].opponent.name

                }

                console.log(tempMatch)

                matchObject.push(tempMatch);


            }
            console.log(matchObject)
            return matchObject;
        })

        .catch(function (err) {
            // API call failed...
        });
    });
}

//  }).pipe(res); line 11
>>>>>>> 6221a1acd69d3f3b5ae3f80908f7d345df6ee870
