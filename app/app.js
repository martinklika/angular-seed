'use strict';
// GLUE TOGETHER FILE :)

// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ngRoute',
  'myApp.view1',
  'myApp.view2',
  'myApp.view3',
  'myApp.view4',
  'myApp.viewLogged',
  'myApp.version'
])

// Setting up a route at the application level (by default /view1)
.config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/view1'});
}
])
/*
.service('userService', function(){
  // users is a list
  this.users = ['Bob', 'Dave'];
  // function addUser that pushes (adds) a name into users
  this.addUser = function(name) {
    this.users.push(name);
  }
}
)
*/;