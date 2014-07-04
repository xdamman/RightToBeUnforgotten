var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    res.render('home', {
        title: "Title"
    });

  });

  server.post('/inbound/:mailgun_key', function(req, res) {
    console.log(req.body);
    if (process.env["MAILGUN_KEY"] === req.params["mailgun_key"]) {
      res.send("Email received!");
    } else {
      res.send(403, "Unauthorized");
    }
  });


};
