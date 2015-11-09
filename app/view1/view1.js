'use strict';
// ^- interpreter setting

// WHAT IS GOING ON HERE?
// Create a module called myApp.view1
// and pass a list of dependencies (Strings)
// ngRoute dependancy is Angular's routing system
//    not included in the base Angular (it is in angular-route.js)
angular.module('myApp.view1', ['ngRoute'])

// .config is a function that configures our module
// $routeProvider is a dependancy of our configuration function
// function() -> what we want to do with our dependencies
// that need to be passed into our function
// $ - Angular dependencies (part of the framework)
.config(['$routeProvider', function($routeProvider) {
  // Route (/view1) configuration, when you navigate to this route
  $routeProvider.when('/view1', {
    // use template stored at this location
    templateUrl: 'view1/view1.html',
    // and use controller with name View1Ctrl
    controller: 'View1Ctrl'
  });
}])

// DEFINING CONTROLLER called View1Ctrl
// Array includes (two) dependencies
// Internal dependency called $scope
// External dependency called userService
// Function uses these two dependencies
// (ordering is important, not the names, however the good practise is that the names are the same)
// $scope is shared between a controller and a view
.controller('View1Ctrl', ['$scope', 'userService', function($scope, userService) {
    // Assigning variable (on object scope create a property name and assign a String 'Martin')
    // (JavaScript's simple way of doing this)
    $scope.name = 'Martin';
        
    // Create another property called names
    // Populated it with whatever is in users (it will have the same type as users)
    $scope.names = userService.users;

    // JavaScript way of creating a function
    // -> anonymous function (do not need to have a name or a type)
    // It is stored in a variable $scope.addUser. Thanks to $scope it can be seen by its View
    $scope.addUser = function() {
      // Call userService with a function called addUser (by chance it has the same name)
      // $scope.name is by defautl 'Martin' but because it is also available from the View
      // it is depedent also by the View (input)
      userService.addUser($scope.name);
    };
}])

.service('userService', function() {
  //users is a list
  this.users = ['Tom', 'Davis'];
  //function addUser that pushes (adds) a name into users
  this.addUser = function(name) {
    this.users.push(name);    
  }
});
