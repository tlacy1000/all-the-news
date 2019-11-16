// Require express and mongoose
var express = require("express");
var mongoose = require("mongoose");

//require all models
var db = require("./models");

// Set up listening port
var PORT = process.env.PORT || 8000;

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

// connect to mongodb
var MONGODB_URI =   "mongodb+srv://cat:catpassword@cluster0-u4pds.mongodb.net/test?retryWrites=true&w=majority/mongoHeadlines" || "mongodb://localhost/mongoHeadlines";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });


// Routes
require("./routes/apiRoutes")(app);
require("./routes/htmlRoutes")(app);

// A GET route for scraping the BBC websit


// Start the server
app.listen(PORT, function() {
  console.log("App running on port http://localhost:" + PORT + "/");
});
