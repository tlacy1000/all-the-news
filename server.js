var MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  console.error('Missing MONGODB_URI environment variable.');
  process.exit(1);
}

// Require express and mongoose
var express = require("express");
var mongoose = require("mongoose");

//require all models
var db = require("./models");

// Set up listening port
var PORT = process.env.PORT || 80;

var app = express();

// Setup public directory
app.use(express.static("public"));

// middleware to parse body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Set Handlebars.
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });

// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// Start the server
app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT + "/");
});
