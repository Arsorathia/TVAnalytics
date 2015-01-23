'use strict';

angular.module('Serv')

.controller('ServController', ['$scope', '$http',
  
  function($scope, $http) {

    $scope.fetch = function(url) {
      $scope.chicken = url.length;
      
      $http({method: 'GET', url: 'http://graph.facebook.com/' + url}).
        success(function(data, status) {
          $scope.status = status;
          $scope.data = data;
        }).
        error(function(data, status) {
          $scope.data = data || "Request failed";
          $scope.status = status;
      });
    };
  }]);