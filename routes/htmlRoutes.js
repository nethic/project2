const db = require('../models');
const path = require('path');

module.exports = function (app) {

//Load main page.
  app.get('/', function (req, res) {
    res.sendFile(path.resolve('./models/index.js'));
  });

  // app.get('/current', function (req, res) {
  //   res.sendFile(path.resolve('./models/currentMatches.js'));
  // });

  // app.get('/upcoming', function (req, res) {
  //   res.sendFile(path.resolve('./models/upcomingMatches.js'));
  // });

  // app.get('/account', function (req, res) {
  //   res.sendFile(path.resolve('./models/account.js'));
  // });

  // app.get('/history', function (req, res) {
  //   res.sendFile(path.resolve('./models/betHistory.js'));
  // });

  // Load example page and pass in an example by id
  //needs work
  app.get('/current/:id', function (req, res) {
    db.Upcoming.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render('example', {
        example: dbExample
      });
    });
  });

  //needs work
  app.get('/upcoming/:id', function(req, res) {
    db.Upcoming.findOne({ where: { id: req.params.id } }).then(function(dbExample) {
      res.render('example', {
        example: dbExample
      });
    });
  });


  // Render 404 page for any unmatched routes
  app.get('*', function (req, res) {
    res.render("404");
  });
};
