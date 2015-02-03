'use strict';

/* App Module */

var courseApp = angular.module('app', [
  'connectionStringCtrls'
]);

var connectionStringCtrls = angular.module('connectionStringCtrls', []);

connectionStringCtrls.controller('defaultCtrl', ['$scope', '$http',
function ($scope, $http) {
    $scope.username="oopop";
	
}]);