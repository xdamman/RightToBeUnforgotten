module.exports = {

  sendTweet: function(text, cb) {

    var oauth = {
      "consumer_key": process.env.TWITTER_API_KEY, 
      "consumer_secret": process.env.TWITTER_API_SECRET, 
      "token": process.env.TWITTER_TOKEN, 
      "token_secret": process.env.TWITTER_TOKEN_SECRET
    };

    var form, r;
    r = request.post("https://api.twitter.com/1.1/statuses/update.json", {oauth: oauth}, cb);
    form = r.form();
    form.append('status', text);
    r.on('error', function(e) {
      console.error("Error while sending the tweet: ", e);
    });
  }

}
