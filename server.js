(function() {

var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
exports.io = io;
 
app.all('*', function(req, res, next) {
  	res.set('Access-Control-Allow-Origin', '*');
  	res.set('Access-Control-Allow-Methods', 'GET, POST, DELETE, PUT');
  	res.set('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type');
  	if ('OPTIONS' == req.method) return res.send(200);
  	next();
});


  app.use(express["static"](__dirname));
  
  console.log('Server started at http://localhost:8080');
  
  var twitter = require('./twittest')
  
}).call(this);
