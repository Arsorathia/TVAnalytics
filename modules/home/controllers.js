'use strict';

angular.module('Home')

.controller('HomeController',
    ['$scope', '$rootScope','$cookies','$cookieStore' ,
    function ($scope, $rootScope, $cookies,$cookieStore) {
      var someSessionObj = { 'innerObj' : 'somesessioncookievalue'};
	$scope.theuser = $rootScope.globals.currentUser; 
    $cookies.dotobject = someSessionObj;
    $scope.usingCookies = { 'cookies.dotobject' : $cookies.dotobject, "cookieStore.get" : $cookieStore.get('dotobject') };

    $cookieStore.put('obj', someSessionObj);
    $scope.usingCookieStore = { "cookieStore.get" : $cookieStore.get('obj'), 'cookies.dotobject' : $cookies.obj, };
    }]);