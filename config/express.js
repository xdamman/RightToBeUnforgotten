var VIEWS_DIR = "views/";

var exphbs  = require('express3-handlebars')
  , logfmt = require("logfmt")
  , bodyParser = require('body-parser')

module.exports = function(server) {

  var hbs = exphbs.create({
      extname: '.hbs'
    , layoutsDir: VIEWS_DIR
    , partialsDir: VIEWS_DIR+"/partials"
    , defaultLayout: 'layout'
  });

  server.set('views', VIEWS_DIR);
  server.set('view engine', 'hbs');
  server.engine('hbs', hbs.engine);
  server.use(logfmt.requestLogger());
  server.use(bodyParser.urlencoded({extended:true}))

  server.set('port', process.env.PORT || process.env.NODE_PORT || 3000);
};
