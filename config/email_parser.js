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
  if (email["X-Mailgun-Spf"] === "Pass" || email["X-Mailgun-Dkim"] === "Pass") {
    forgotten.valid = true
  }
  lookupUrl(urls, function(err, embedly) {
    forgotten.extracted_urls = urls;
    forgotten.urls = embedly;
    for(var i=0; i < forgotten.urls.length; i++) {
      var link = forgotten.urls[i];
      link.domain = getDomain(link.url);
      link.favicon = getFavicon(link.url);
    }
    callback(null, forgotten);
  });
};

function urlFind(text) {
  return text.match(URL_REGEX);
}

function getDomain(url) {
  var matches = url.match(/https?\:\/\/([a-zA-Z0-9\.]+)\/?/);
  if (matches.length > 0) {
    return matches[1];
  }
}

function getFavicon(url) {
  var domain = getDomain(url);
  if (domain) {
    return "http://" + domain + "/favicon.ico"
  }
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

