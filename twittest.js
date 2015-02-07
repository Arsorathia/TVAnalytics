var Twit = require('twit');
var io = require('./server').io;
var sentiment = require('sentiment');


 
 var T = new Twit({
    consumer_key:         'gyRCME1j5knQUlypAzosw',
    consumer_secret:      '7kHYP279mnzifdvWocXKdraD2lOIlmFodZXXPj6UA0',
    access_token:         '33256579-VC5X2TMPkkKH57pGWX5yX4lILFjkpnNTHWqwj5H1L',
    access_token_secret:  'OcCjWKuft0rG87CwFEJ5UuZoX1HgnqEQRf4YFdAzBI'
});

console.log("Listening for tweets about data");
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
	console.log(msg);
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



