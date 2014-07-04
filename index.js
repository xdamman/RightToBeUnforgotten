var express = require('express');

var server = express();
require('./config/express')(server);
require('./config/routes')(server);


console.log("Server listening on port " + server.set('port') + ' in ' + server.set('env') + ' environment');
server.listen(server.set('port'));

