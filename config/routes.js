var db = require('./db');
var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    var selection = req.param('selection','media companies');

    switch(selection) {
      case "media companies":
        urls = [
          {
            url: "http://www.bbc.co.uk/blogs/legacy/thereporters/robertpeston/2007/10/merrills_mess.html",
            title: "Merrill's mess",
            domain: "bbc.co.uk",
            favicon: "http://www.bbc.co.uk/favicon.ico"
          }
        ];
        break;

      case "anyone":
        urls = [
          {
            url: "http://www.bbc.co.uk/blogs/legacy/thereporters/robertpeston/2007/10/merrills_mess.html",
            title: "Merrill's mess",
            domain: "unknown",
            favicon: "unknown"
          }
        ];
        break;
    }

    res.render('home', {
        title: "Title"
      , urls: urls 
      , selection: selection
    });

  });

  server.post('/inbound/:mailgun_key', function(req, res) {
    if (process.env["MAILGUN_KEY"] === req.params["mailgun_key"]) {
      db.collection('emails').insert(req.body, function(err, result){
        if (err) {
          console.log("Error adding email: " + err);
        } else {
          console.log("New email added");
        }
      })
      res.send("Email received!");
    } else {
      res.send(403, "Unauthorized");
    }
  });


};
