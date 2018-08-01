//https://api.pandascore.co/ow/matches/upcoming?
require("dotenv").config();
var request = require('request');
var rp = require('request-promise');

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
                console.log(matches[i].id)
                console.log(matches[i].name)
                console.log(matches[i].begin_at)
                console.log(matches[i].opponents[0].opponent.name)
                console.log(matches[i].opponents[1].opponent.name)
            }
            //console.log(matches);
        })
        .catch(function (err) {
            // API call failed...
        });
}

//  }).pipe(res); line 11