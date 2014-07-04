var mongo = require('mongoskin');
module.exports = mongo.db(process.env["MONGO_URL"] || "mongodb://localhost:27017/righttobeunforgotten", {native_parser:true});

