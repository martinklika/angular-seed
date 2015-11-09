'use strict';

angular.module('myApp.viewLogged', ['ngRoute'])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/viewLogged', {
			templateUrl: 'viewLogged/viewLogged.html',
			controller: 'viewLoggedController'
		})
	}])

	.controller('viewLoggedController', ['$scope', '$http', "$location", function ($scope, $http, $location) {

		// Define list of friends within the scope
		$scope.listOfFriends = [];
		// Define list of deleted friends
		// View does not need to know about this list - do not need the scope
		var listOfFakeDeletedFriends = [];
		
		// List all friends
		$http.get('http://localhost:8910/person')
			.then(
				function (response) {
					$scope.listOfFriends = response.data;
					$scope.actionMessage = ' ';
					$scope.actionColour = 'black';
					console.log('List of all friends displayed');
				}, function () {
					console.log('Something went wrong when displaying list of friends!');
				}
				);
		
		// Add a friend
		$scope.addFriend = function () {
			$http.post(
				'http://localhost:8910/person',
				{
					'name': $scope.name
				}
				).then(
					function (response) {
						// "Refreshes" the list after add
						$scope.listOfFriends = response.data;
						$scope.actionMessage = 'Friend added';
						$scope.actionColour = 'blue';
						console.log('Friend added')
					}, function () {
						console.log('Something went wrong when adding a friend!')
					}
				);
		}//addFriend
		
		// Add a friend - by name passed as a parameter 
		// Used in restoring soft deleted friends
		$scope.addFriendByName = function (nameOfAddedFriend) {
			$http.post(
				'http://localhost:8910/person',
				{
					'name': nameOfAddedFriend
				}
				).then(
					function (response) {
						// "Refreshes" the list after add
						$scope.listOfFriends = response.data;
						$scope.actionMessage = 'Friend(s) added';
						$scope.actionColour = 'blue';
						console.log('Friend added')
					}, function () {
						console.log('Something went wrong when adding a friend!')
					}
				);
		}//addFriend
		
		// Delete a friend
		$scope.deleteFriend = function (id) {
			$http.delete(
				'http://localhost:8910/person/' + id
				).then(
					function (response) {
						// "Refreshes" the list after deletion
						$scope.listOfFriends = response.data;
						$scope.actionMessage = 'Friend(s) deleted';
						$scope.actionColour = 'red';
						console.log('Friend deleted');
					}, function () {
						console.log('Something went wrong when deleting a friend!')
					}
				);
		}//deleteFriend
		
		// Delete all friends
		$scope.deleteAllFriends = function () {
			// Number of friends
			var numberOfFriends = $scope.listOfFriends.length;
			// Go through all friends and call deleteFriend(id) function
			for (var i=0; i<numberOfFriends; i++) {
     			$scope.deleteFriend($scope.listOfFriends[i].id)
    		}//for
			listOfFakeDeletedFriends = [];
		}//deleteAllFriends
		
		// Fake delete a friend
		$scope.fakeDeleteFriend = function (id) {
			
			var numberOfFriends = $scope.listOfFriends.length;
			var indexInListOfFriends = -1;
			// Go through all friends and find friend with my id and his/her position/index in the list
			var i = 0;
			var found = false;
			while (i < numberOfFriends && !found) {
				if ($scope.listOfFriends[i].id == id) {
    				indexInListOfFriends = i;
					found = true;
				}//if
				i++;
    		}//while
			
			console.log('Index in list of friends is: ' + indexInListOfFriends);
					
			if (indexInListOfFriends > -1) {
				$http.delete(
					'http://localhost:8910/person/' + id
					).then(
						function (response) {
							// Add a friend to the list of deleted friends before actually deleting him
							console.log('Friend faked deleted: ' + $scope.listOfFriends[indexInListOfFriends]);
							listOfFakeDeletedFriends.push($scope.listOfFriends[indexInListOfFriends]);
							console.log(listOfFakeDeletedFriends);
							
							// "Refreshes" the list after deletion
							$scope.listOfFriends = response.data;
							$scope.actionMessage = 'Friend(s) fake deleted';
							$scope.actionColour = 'red';
							console.log('Friend fake deleted');
						}, function () {
							console.log('Something went wrong when deleting a friend!')
						}
					);	
			} else {
				console.log('Existing index in list of friends was not found (this should not happen in front end)!')
			}//if-else
			
		}//fakeDeleteFriend
		
		// Fake delete all friends
		$scope.fakeDeleteAllFriends = function () {
			// Number of friends
			var numberOfFriends = $scope.listOfFriends.length;
			// Go through all friends and call fakeDeleteFriend(id) function
			for (var i = numberOfFriends - 1; i >= 0 ; i--) {
     			$scope.fakeDeleteFriend($scope.listOfFriends[i].id);
    		}//for
		}//fakeDeleteAllFriends
		
		// Restore fake deleted friends
		$scope.restoreFakeDeletedFriends = function () {
			var numberOfDeletedFriends = listOfFakeDeletedFriends.length;
			// Go through all deleted friends
			
			var deletedNames = [];
			
			for (var i = 0; i < numberOfDeletedFriends; i++) {
				deletedNames.push(listOfFakeDeletedFriends[i].name);
    		}//for
			
			console.log('all names are ' + deletedNames);
			
			/*
			for (var i = numberOfDeletedFriends - 1; i >=0 ; i--) {
				$scope.addFriendByName(deletedNames[i]);
    		}//for
			*/
			for (var i = 0; i < numberOfDeletedFriends ; i++) {
				$scope.addFriendByName(deletedNames[i]);
    		}//for
			
			listOfFakeDeletedFriends = [];
		}//restoreFakeDeletedFriends
	}
	]
);