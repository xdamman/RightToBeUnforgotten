var express = require('express');

module.exports = function(server) {

  server.use('/public', express.static('public/'));

  server.get('/', function(req, res) {

    res.render('home', {
        title: "Title"
    });

  });

};
