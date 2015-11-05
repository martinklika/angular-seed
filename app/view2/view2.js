'use strict';

// Creating module called myApp.view2
// it has a dependency on ngRoute
angular.module('myApp.view2', ['ngRoute'])

// Get $routeProvider (provided by ngRoute - angular stuff)
// and use it in the function (with no name :O)
.config(['$routeProvider', function($routeProvider) {
  // update the routeProvider to add a route /view2
  $routeProvider.when('/view2', {
    // that will display this url
    templateUrl: 'view2/view2.html',
    // and set a controller - with a name View2Ctrl
    controller: 'View2Ctrl'
  });
}])

// Create the controller called View2Ctrl
// It has a dependency $scope and userService
.controller('View2Ctrl', ['$scope', 'userService', function($scope, userService) {
  $scope.names = userService.users;
}]); 