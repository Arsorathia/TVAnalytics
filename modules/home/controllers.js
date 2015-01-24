'use strict';

angular.module('Home',["highcharts-ng"])

.controller('HomeController',
    function ($scope, $rootScope, $cookies, $cookieStore, Facebook) {
    var someSessionObj = { 'innerObj' : 'somesessioncookievalue'};
	$scope.theuser = $rootScope.globals.currentUser; 
    $cookies.dotobject = someSessionObj;
    $scope.usingCookies = { 'cookies.dotobject' : $cookies.dotobject, "cookieStore.get" : $cookieStore.get('dotobject') };
	$scope.dataarray = [{name :'Media' , y:13}, {name :'Cable' , y:17}, {name:'Custom' , y:22}]
    $cookieStore.put('obj', someSessionObj);
    $scope.usingCookieStore = { "cookieStore.get" : $cookieStore.get('obj'), 'cookies.dotobject' : $cookies.obj, };
    $scope.totalsales = '$27 on 3 projects';
    $scope.chart = {
    options: {
        chart: {
            type: 'pie', 
            backgroundColor: 'rgba(255, 255, 255, 0.0)'
        }, 
        plotOptions: {
            pie: {
                shadow: false,
                center: ['20%', '20%']
            }, 
            series: {
                cursor: 'pointer',
                point: {
                    events: {
                        click: function () {
                            alert('Category: ' + this.category + ', value: ' + this.y);
                        }
                    }
              }
              } 
              }, 
        labels: {
            items: [{
                html: $scope.totalsales,
                style: {
                    left: '105px',
                    top: '32px',
                    fontSize: '15px', 
                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                }
            }]
        }
    },
    series: [{
            type: 'column',
            name: 'Media',
            data: [3, 2, 1, 3]
        }, {
            type: 'column',
            name: 'Cable',
            data: [2, 3, 5, 7]
        }, {
            type: 'column',
            name: 'Wireless',
            data: [4, 3, 3, 9]
        }, {
            type: 'spline',
            name: 'Target',
            data: [3, 2.67, 3, 6.33],
            marker: {
                lineWidth: 2,
                lineColor: Highcharts.getOptions().colors[3],
                fillColor: 'white'
            }
        }, {
            type: 'pie',
            name: 'Projects',
            data: [{
                name: 'Media',
                y: 2,
                color: Highcharts.getOptions().colors[0] // Jane's color
            }, {
                name: 'Cable',
                y: 4,
                color: Highcharts.getOptions().colors[1] // John's color
            }, {
                name: 'Wireless',
                y: 6,
                color: Highcharts.getOptions().colors[2] // Joe's color
            }],
            center: [100, 80],
            size: 100,
            showInLegend: false,
            dataLabels: {
                enabled: false
            }
        }],
    title: {
        text: 'Hello'
    },

    loading: false
}

  });
    
    
    
