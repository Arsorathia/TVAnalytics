'use strict';

// declare modules
angular.module('Authentication', []);
angular.module('Home', []);
angular.module('Browse', []);
angular.module('Projects', []);
angular.module('Manage', []);
angular.module('Serv', []);


angular.module('BasicHttpAuthExample', [
    'Authentication',
    'Home',
    'Browse',
    'Manage',
    'Serv',
    'Projects',
    'facebook',
    'ngRoute',
    'ngCookies'
])

.config(function(FacebookProvider) {
     // Set your appId through the setAppId method or
     // use the shortcut in the initialize method directly.
     FacebookProvider.init('528830580592609');
  })

.config(['$routeProvider', function ($routeProvider) {

    $routeProvider
        .when('/login', {
            controller: 'LoginController',
            templateUrl: 'modules/authentication/views/login.html',
            hideMenus: true
        })

        .when('/', {
            controller: 'HomeController',
            templateUrl: 'modules/home/views/home.html'
        })
        
        .when('/browse', {
            controller: 'BrowseController',
            templateUrl: 'modules/browse/views/browse.html'
        })
        
            .when('/serv', {
            controller: 'ServController',
            templateUrl: 'modules/http/views/http.html'
        })
        
            .when('/manage', {
            controller: 'ManageController',
            templateUrl: 'modules/manage/views/manage.html'
        })
        
        .when('/browse/:id', {
            controller: 'ProjectController',
            templateUrl: 'modules/projects/views/project.html'
        })
        
        .otherwise({ redirectTo: '/login' });
}])

.run(['$rootScope', '$location', '$cookieStore', '$http', 'Facebook',
    function ($rootScope, $location, $cookieStore, $http, Facebook) {
        // keep user logged in after page refresh
        $rootScope.globals = $cookieStore.get('globals') || {};
        if ($rootScope.globals.currentUser) {
            $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata; // jshint ignore:line
        }

	 $rootScope.fblogin = function() {
      // From now on you can use the Facebook service just as Facebook api says
      Facebook.login(function(response) {
        // Do something with response.
          if (response.status == 'connected') {
            $rootScope.loggedIn = true;
            $rootScope.me();
          }
      });
    };

    $rootScope.getLoginStatus = function() {
      Facebook.getLoginStatus(function(response) {
        if(response.status === 'connected') {
          $rootScope.loggedIn = true;
        } else {
          $rootScope.loggedIn = false;
        }
      });
    };

    $rootScope.me = function() {
      Facebook.api('/me', function(response) {
        $rootScope.fbuser = response;
      });
    };
		
        $rootScope.$on('$locationChangeStart', function (event, next, current) {
            // redirect to login page if not logged in
            if ($location.path() !== '/login' && !$rootScope.globals.currentUser) {
                $location.path('/login');
            }
            // redirect to browse page if manage page accessed by non admin
            if ($location.path() === '/manage' && !$rootScope.globals.currentUser.adminaccess) {
                $location.path('/browse');
            }
        });
        
        
    }]);