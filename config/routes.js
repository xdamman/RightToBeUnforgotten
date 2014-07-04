var db = require('./db');
var mongoskin = require('mongoskin');
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

  server.get('/process/:id', function(req, res) {
    db.collection('emails').findById(req.params['id'], function(err, result){
      db.processEmail(result, function(err, result){
        res.json(result);
      });
    })
  });

  server.post('/inbound/:mailgun_key', function(req, res) {
    if (process.env["MAILGUN_KEY"] === req.params["mailgun_key"]) {
      db.collection('emails').insert(req.body, function(err, result){
        if (err) {
          console.log("Error adding email: " + err);
        } else {
          db.processEmail(result, function(err, disappeared){
            console.log(disappeared);
          });
        }
      })
      res.send("Email received!");
    } else {
      res.send(403, "Unauthorized");
    }
  });

};
