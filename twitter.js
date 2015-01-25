  var Twit = require('twit');
  
  var T = new Twit({
    consumer_key:         'uxyWok0L2AkxgUE74qw4Qv9Gz',
    consumer_secret:      'kjvaho9d3MlOyvCSC8To7qlLLaLO6UfgBGRnMrvE2px73aX6QJ',
    access_token:         '33256579-0bPCbBH8FvEb5UaOkf0ZwyKDxEueHUPUtYW4IDE79',
    access_token_secret:  'ktMV3f5OLpPoVZ5ZECjxcb7qw4oOPg9j8n7EMzB8MbdKo'
});

console.log("Listening for tweets from San Francisco...");
var stream = T.stream('statuses/filter', { locations: [-122.75,36.8,-121.75,37.8] });
var tweetsBuffer = [];
 
stream.on('connect', function(request) {
    console.log('Connected to Twitter API');
});
 
stream.on('disconnect', function(message) {
    console.log('Disconnected from Twitter API. Message: ' + message);
});
 
stream.on('reconnect', function (request, response, connectInterval) {
  console.log('Trying to reconnect to Twitter API in ' + connectInterval + ' ms');
})
 
stream.on('tweet', function(tweet) {
    if (tweet.geo == null) {
        return ;
    }
 
    //Create message containing tweet + username + profile pic + geo
    var msg = {};
    msg.text = tweet.text;
    msg.geo = tweet.geo.coordinates;
    msg.user = {
        name: tweet.user.name,
        image: tweet.user.profile_image_url
    };
 
    console.log(msg);
});

