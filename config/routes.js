module.exports = function(server) {

  server.get('/', function(req, res) {

    res.render('home', {
        title: "Title"
    });

  });

  server.get('/inbound/:mailgun_key', function(req, res) {
    console.log(req.body);
    if (process.env["MAILGUN_KEY"] === req.params["mailgun_key"]) {
      res.send("Email received!");
    } else {
      res.send(403, "Unauthorized");
    }
  });


};
