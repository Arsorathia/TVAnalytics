'use strict';

angular.module('Browse', ['ngRoute'])

  .factory('socket', function($rootScope){
   var socket = io.connect('http://localhost:8080');
    return {
        on: function (eventName, callback) {
            socket.on(eventName, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            });
        }
    };
  })

  .controller('BrowseController', ['$scope', 'socket', function ($scope, socket) {
    $scope.projects = [
			{id:1, Name:'Project 1',  Sow:"SOW 1" ,Partner: "Part A", Sig: "Sig A" },
			{id:2, Name:'Project 2',  Sow:"SOW 2" ,Partner: "Part A", Sig: "Sig A"},
			{id:3, Name:'Project 3',  Sow:"SOW 3" ,Partner: "Part B", Sig: "Sig B"},
			{id:4, Name:'Project 4',  Sow:"SOW 4" ,Partner: "Part A", Sig: "Sig A"},
			{id:5, Name:'Project 5',  Sow:"SOW 5" ,Partner: "Part C", Sig: "Sig C"},
			{id:6, Name:'Project 6',  Sow:"SOW 6" ,Partner: "Part A", Sig: "Sig A"}];
    $scope.tweets = [];
 
socket.on('tweets', function (data) {
    $scope.tweets = $scope.tweets.concat(data);
});
  }])
  
  .filter('reverse', function() {
	return function(items) {
		return (items != null ? items.slice().reverse() : []);
	};
});
