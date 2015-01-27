  var Twit = require('twit');
  var io = require('./server').io;
  var TWEETS_BUFFER_SIZE = 5;


  
  var T = new Twit({
    consumer_key:         'uxyWok0L2AkxgUE74qw4Qv9Gz',
    consumer_secret:      'kjvaho9d3MlOyvCSC8To7qlLLaLO6UfgBGRnMrvE2px73aX6QJ',
    access_token:         '33256579-0bPCbBH8FvEb5UaOkf0ZwyKDxEueHUPUtYW4IDE79',
    access_token_secret:  'ktMV3f5OLpPoVZ5ZECjxcb7qw4oOPg9j8n7EMzB8MbdKo'
});

console.log("Listening for tweets about mango");
var stream = T.stream('statuses/filter', { track: 'mango' , language: 'en'});
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
 
    //Create message containing tweet + username + profile pic + location
    var msg = {};
    msg.text = tweet.text;
    msg.id = tweet.id_str;
    msg.name = tweet.user.name;

 
    //push msg into buffer
    tweetsBuffer.push(msg);
 
    //send buffer only if full
    if (tweetsBuffer.length >= TWEETS_BUFFER_SIZE) {
        //broadcast tweets
        io.sockets.emit('tweets', tweetsBuffer);
        tweetsBuffer = [];
    }
});

var nbOpenSockets = 0;
 
io.sockets.on('connection', function(socket) {
    console.log('Client connected !');
    if (nbOpenSockets <= 0) {
        nbOpenSockets = 0;
        console.log('First active client. Start streaming from Twitter');
        stream.start();
    }
 
    nbOpenSockets++;
 
    socket.on('disconnect', function() {
        console.log('Client disconnected !');
        nbOpenSockets--;
 
        if (nbOpenSockets <= 0) {
            nbOpenSockets = 0;
            console.log("No active client. Stop streaming from Twitter");
            stream.stop();
        }
    });
});

