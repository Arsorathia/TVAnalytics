'use strict';

angular.module('Projects')

.controller('ProjectController', function($scope, $routeParams) {
    $scope.projects = [
			{id:1, Name:'Project 1',  Sow:"SOW 1" ,Partner: "Part A", Sig: "Sig A" },
			{id:2, Name:'Project 2',  Sow:"SOW 2" ,Partner: "Part A", Sig: "Sig A"},
			{id:3, Name:'Project 3',  Sow:"SOW 3" ,Partner: "Part B", Sig: "Sig B"},
			{id:4, Name:'Project 4',  Sow:"SOW 4" ,Partner: "Part A", Sig: "Sig A"},
			{id:5, Name:'Project 5',  Sow:"SOW 5" ,Partner: "Part C", Sig: "Sig C"},
			{id:6, Name:'Project 6',  Sow:"SOW 6" ,Partner: "Part A", Sig: "Sig A"}] ; 
    $scope.hello = $routeParams.id;
});