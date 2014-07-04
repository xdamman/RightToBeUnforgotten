var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    urls = [
      {
        url: "http://www.bbc.co.uk/blogs/legacy/thereporters/robertpeston/2007/10/merrills_mess.html",
        title: "Merrill's mess",
        domain: "bbc.co.uk",
        favicon: "http://www.bbc.co.uk/favicon.ico"
      }
    ];

    res.render('home', {
        title: "Title"
      , urls: urls 
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
