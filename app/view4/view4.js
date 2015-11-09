'use strict';

angular.module('myApp.view4', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/view4', {
			templateUrl: 'view4/view4.html',
			controller: 'View4Ctrl'
		})
	}])

	.controller('View4Ctrl', ['$scope', '$http', "$location", function ($scope, $http, $location) {

		$scope.loginUser = function () {

			$http.post(
				'http://localhost:8080/login',
				{
					'username': $scope.username,
					'password': $scope.password
				}
				).then(
					function () {
						console.log('MUCH SUCCESS!');
						$location.path('/viewLogged');
					}, function () {
						console.log('OH THE SHAME!!!');
					}
				);

			
			/* LONGER WORKING VERSION
			$http({
				headers: {
					'content-type': 'application/json'
					},
				method: 'post',
				url: 'http://localhost:8080/login',
				data: {
					username: $scope.username,
					password: $scope.password
				}
			}).then(
				function success(data) {
					console.log("Success!");
					console.log(data);
					// Passed parameter must be registered
					$location.path('/view2');
				},
				
				function failure(data) {
					console.log("Failure!");
					console.log(data);
				}	
			);
			*/
		}
	}
	]
);