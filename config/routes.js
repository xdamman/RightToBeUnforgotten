var db = require('./db');
var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    res.render('home', {
        title: "Title"
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
