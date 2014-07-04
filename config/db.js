var mongo = require('mongoskin');
var db = mongo.db(process.env["MONGO_URL"] || "mongodb://localhost:27017/righttobeunforgotten", {native_parser:true});
var emailParser = require('./email_parser');


db.processEmail = function(email, callback) {
  emailParser.parse(email, function(err, disappeared) {
    db.collection('disappeareds').update({emailId: email._id}, {$set: disappeared}, {upsert:true}, function(err, result){
      console.log("Records updated: "+ result);
      return callback(err, disappeared);
    });
  });
}

module.exports = db
