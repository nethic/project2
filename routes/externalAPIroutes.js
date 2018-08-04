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
        team_B: matches[i].opponents[1].opponent.name,
        match_result: null
      };
      matchesArr.push(tempMatch);
    }
    console.log(matchesArr);
    callback(matchesArr);
  });
};


//wrapping in a function?
// /api/matches/update
function updateMatches() {
  var options = {
    uri: "shttps://api.pandascore.co/ow/matches/past",
    qs: {
      token: process.env.PANDA_KEY // -> uri + '?access_token=xxxxx%20xxxxx'
    },
    headers: {
      "User-Agent": "Request-Promise"
    },
    json: true // Automatically parses the JSON string in the response
  };

  //not done yet, going to do api call from past event URL, compare IDs, update result boolean based on string match.
  rp(options).then(function(matches) {
    for (i = 0; i < matches.length; i++) {

      //find id in Table matching api id.
      Matches.find({ where: { match_id: matches[i].id } })
      .on('success', function (tempWinner) {
      // if statement checking if name === a or b
        var tempWinner
        if (matches[id].winner.name === matches[i].opponents[0].opponent.name) {
          tempWinner = true;
        }
        else if (matches[id].winner.name === matches[i].opponents[1].opponent.name) {
          tempWinner = false;
        };
        //sequelize update if variable is 
        if (tempWinner != null) {
          Matches.updateAttributes({
            match_result: tempWinner
          })
          .success(function () {})
        }
      })
      
    }
  })
};


/////////////////////////////////////////////
app.get("/api/matches/update", function(req, res) {
  matchesExternal(function(data) {
    var matches = data;
    matches.forEach(function(match) {
      db.Matches.upsert(match);
    });
  });
  res.send("Working!");
});

