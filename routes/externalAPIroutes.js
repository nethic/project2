require("dotenv").config();
var rp = require("request-promise");
var db = require("../models"); //added because db was not defined

module.exports = 

{getMatches: function (callback) {
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
  },



//wrapping in a function?
// /api/matches/update
updateMatches: function() {
    var options = {
      uri: "https://api.pandascore.co/ow/matches/past",
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
      var iti = 0;
      //console.log(JSON.stringify(matches[iti].id))
      while (iti < matches.length) {
        

        //find id in Table matching api id.
        db.Matches.find({ where: { match_id: matches[iti].id } })
        
        // if statement checking if name === a or b
          var tempWinner
          if (matches[iti].winner.name == matches[iti].opponents[0].opponent.name) {
            tempWinner = "true";
          }
          else if (matches[iti].winner.name == matches[iti].opponents[1].opponent.name) {
            tempWinner = "false";
          };
          //sequelize update if variable is 
          if (tempWinner != null) {
            db.Matches.update({
              match_result: tempWinner
            }, 
              {where: 
                {match_id: matches[iti].id}
              })
          }

        iti++
      }
    })
  }

}