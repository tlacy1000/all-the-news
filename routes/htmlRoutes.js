var db = require("../models");

module.exports = function (app) {
    // Load index page
    // app.get("/", function (req, res) {
    //     db.Article.find({ "saved": false }, function (error, data) {
    //         var hbsObject = {
    //             article: data
    //         };
    //         // console.log(hbsObject);
    //         res.render("index", hbsObject);
    //     });
    // });

    // app.get("/saved", function (req, res) {
    //     db.Article.find({ saved: true }).populate("note").exec(function(error, data) {
    //       var hbsObject = {
    //         article: data
    //       };
          
    //       if(error){
    //           res.send(error)
    //       } else {
    //           res.render("saved", hbsObject);
    //       }
          
    //     });
    // });

    
    // Render 404 page for any unmatched routes
    app.get("*", function (req, res) {
        res.render("404");
    });
};
