(function() {

var express = require('express');
var app = express();
var server = app.listen(8080);
var io = require('socket.io').listen(server);
exports.io = io;


  app.use(express["static"](__dirname));
  
  console.log('Server started at http://localhost:8080');
  
  var twitter = require('./twitter')
  
}).call(this);
