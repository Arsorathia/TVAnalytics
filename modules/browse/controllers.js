'use strict';

angular.module('Browse',["highcharts-ng"])

  .factory('socket', function($rootScope){
   var socket = io.connect('http://54.175.133.110:8080');
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
$scope.tweets = [];
$scope.average = [];
$scope.chartConfig = {
    options: {
        chart: {
            type: 'spline'
        }
    },
    series: [{
        data: []
    }],
    title: {
        text: 'Hello'
    },
    loading: false,
}
socket.on('tweets', function (data) {
    $scope.tweets = $scope.tweets.concat(data);
    $scope.number = $scope.tweets.length
});

socket.on('clear', function (data) {
$scope.chartConfig.series[0].data = [])
});


socket.on('whatwhat', function (data) {
$scope.average = $scope.average.concat(data);
$scope.chartConfig.series[0].data = $scope.chartConfig.series[0].data.concat([[data.number, data.average]])
});


  }])
  
  .filter('reverse', function() {
	return function(items) {
		return (items != null ? items.slice().reverse() : []);
	};
});
