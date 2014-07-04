var db = require('./db');
var mongoskin = require('mongoskin');
var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    var selection = req.param('selection','media companies');

    switch(selection) {
      case "media companies":
        db.getDisappeareds(function(err, urls){
        console.log(urls);
        res.render('home', {
          title: "Title"
          , urls: urls 
          , selection: selection
        });
      })
      break;

      case "anyone":
        db.getDisappeareds(function(err, urls){
        console.log(urls);
        res.render('home', {
          title: "Title"
          , urls: urls 
          , selection: selection
        });
      })
      break;
    }

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
