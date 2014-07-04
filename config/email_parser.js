var Embedly = require('embedly'),
    util = require('util');

var EMBEDLY_KEY = process.env['EMBEDLY_API_KEY'];
var URL_REGEX = /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;

exports.parse = function(email, callback) {
  var forgotten = {
    "urls": [],
    "emailId": email._id
  }
  var urls = urlFind(email['stripped-text']);
  lookupUrl(urls, function(err, embedly) {
    console.log(embedly);
    forgotten.extracted_urls = urls;
    forgotten.urls = embedly;
    callback(null, forgotten);
  });
};

function urlFind(text) {
  return text.match(URL_REGEX);
}

function lookupUrl(urls, callback) {
  new Embedly({key: EMBEDLY_KEY}, function(err, api) {
    if (!!err) {
      console.error('Error creating Embedly api');
      console.error(err.stack, api);
      return callback(err);
    }

    api.oembed({urls: urls}, function(err, objs) {
      callback(err, objs)
    });
  });
}

