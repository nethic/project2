require("dotenv").config();
var express = require("express");
var bodyParser = require("body-parser");
var exphbs = require("express-handlebars");
var path = require("path");

var db = require("./models");

var app = express();
var PORT = process.env.PORT || 8080;

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));

// Handlebars
/*
app.engine(
  "handlebars",
  exphbs({
    defaultLayout: "main"
  })
);
<<<<<<< HEAD
//app.set("view engine", "handlebars");
=======
app.set("view engine", "handlebars");
*/
>>>>>>> 1a7c168c8ff7bb9796a1307c35973bfe8edde59c

// Routes
<<<<<<< HEAD
require("./routes/internalAPIRoutes")(app);
=======
require("./routes/internalAPIroutes")(app);
>>>>>>> master
require("./routes/htmlRoutes")(app);
require("./routes/externalAPIRoutes")(app);

var syncOptions = { force: false };

// If running a test, set syncOptions.force to true
// clearing the `testdb`
if (process.env.NODE_ENV === "test") {
  syncOptions.force = true;
}

// Starting the server, syncing our models ------------------------------------/
db.sequelize.sync(syncOptions).then(function() {
  app.listen(PORT, function() {
    console.log(
      "==> 🌎  Listening on port %s. Visit http://localhost:%s/ in your browser.",
      PORT,
      PORT
    );
  });
});

module.exports = app;
