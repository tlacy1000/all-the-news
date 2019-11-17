// Axios and cheerio to query and scrape
var axios = require("axios");
var cheerio = require("cheerio");

var db = require("../models");

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    axios.get("https://fivethirtyeight.com/politics/").then(function(response) {
      var $ = cheerio.load(response.data);

      $(".fte_features").each(function(i, element) {
        // Create an empty result object
        var result = {};

        // Add the text and href and image of every link, and save them as properties of the result object
        result.title = $(element)
          .find(".article-title")
          .children("a")
          .text()
          .trim();
        result.link = $(element)
          .children("a")
          .attr("href");
        result.image = $(element)
          .children("a")
          .children("img")
          .attr("src");

        console.log(result);
        // Create a new Article using the `result` object built from scraping if the title, link and image exist
        if (result.title && result.link && result.image) {
          db.Article.create(result)
            .then(function(dbArticle) {
              // View the added result in the console
              console.log(dbArticle);
            })
            .catch(function(err) {
              // If an error occurred, log it
              console.log(err);
            });
        }
      });
      // Send a message to the client
      res.redirect("/");
    });
  });

  app.get("/api/articles", function(req, res) {
    db.Article.find({})
      .populate("note")
      .then(function(data) {
        res.json(data);
      });
  });

  // // put route to updated the article to be saved:true
  app.post("/api/saved/:id", function(req, res) {
    // res.redirect("/")
    db.Article.updateOne(
      { _id: req.params.id },
      { $set: { saved: true } },
      function(err, doc) {
        if (err) {
          res.send(err);
        } else {
          // res.redirect("/");
        }
      }
    );
  });

  // Save a note route
  app.post("/api/saved/notes/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        console.log(req.params.id, dbNote);
        //update the Article and push the note id into the array
        return db.Article.findOneAndUpdate(
          { _id: req.params.id },
          { $push: { note: dbNote._id } }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // // Delete a note route
  app.delete("/api/notes/:id", function(req, res) {
    console.log(req.params.id);
    db.Note.findOneAndDelete({ _id: req.params.id })
      .then(function(dbNote) {
        return db.Article.findOneAndUpdate(
          { note: req.params.id },
          { $pullAll: [{ note: req.params.id }] }
        );
      })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  //Delete Saved Article Route
  app.delete("/api/articles/:id", function(req, res) {
    db.Article.findOneAndDelete({ _id: req.params.id })
      .then(function(dbArticle) {
        res.json(dbArticle);
      })
      .catch(function(err) {
        res.json(err);
      });
  });

  // // Clear all Unsaved Articles
  app.delete("/api/articles", function (req, res) {
    db.Article.remove({saved: false})
      .then(function (dbArticle) {
        res.json(dbArticle);
      })
      .catch(function (err) {
        res.json(err);
      });
  });
};
