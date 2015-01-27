var Twit = require('twit');
var io = require('./server').io;
var sentiment = require('sentiment');


 
 var T = new Twit({
    consumer_key:         'uxyWok0L2AkxgUE74qw4Qv9Gz',
    consumer_secret:      'kjvaho9d3MlOyvCSC8To7qlLLaLO6UfgBGRnMrvE2px73aX6QJ',
    access_token:         '33256579-0bPCbBH8FvEb5UaOkf0ZwyKDxEueHUPUtYW4IDE79',
    access_token_secret:  'ktMV3f5OLpPoVZ5ZECjxcb7qw4oOPg9j8n7EMzB8MbdKo'
});

console.log("Listening for tweets about mango");
var stream = T.stream('statuses/filter', { track: 'data' , language: 'en'});

io.on('connection', function(socket){
  console.log('a user gone done connected');
});
var tweetagg = []
 stream.on('tweet', function(tweet) {
    //Create message containing tweet + username + profile pic + location
    var msg = {};
    msg.text = tweet.text;
    msg.id = tweet.id_str;
    msg.name = tweet.user.name;
    msg.sentiment = sentiment(tweet.text).score
	io.sockets.emit('tweets', msg)
	tweetagg.push(msg.sentiment)
});

io.on('connection', function(socket){
  socket.on('chicken', function(msg){
    console.log('message: ' + msg.id);
  });
});

setInterval(function(){
    if (tweetagg.length > 0)
    {
    var total = tweetagg.reduce(function(a, b) {
        return a + b;
         });
    var avg = total / tweetagg.length ; 
    io.sockets.emit('whatwhat', {average : avg , number : tweetagg.length} ); }
}, 1000);



