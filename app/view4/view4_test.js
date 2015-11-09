'use strict';

describe('View4Ctrl', function() {
		
		// Register the Angular module
		beforeEach(module('myApp.view4'));
		
		// Inject takes a function with injectable properties
		it('Test calling the logging service when the loginUser function is called',
				inject(function($controller, $httpBackend) {
			
			// Dependencies
			var mockScope = {
				username: 'admin',
				password: 'password'
			};
			
			var mockLocation = {
				// Option2, using spyOn: // path: function() {}
			};
			
			var mockDependancy = {
				$scope: mockScope,
				$location: mockLocation
			};
				
			// Define controller
			var view4controller = $controller('View4Ctrl', mockDependancy);	
			
			// Create expectation
			$httpBackend.expectPOST(
				'http://localhost:8080/login', 
				{
					username: 'admin',
					password: 'password'
				}
			).respond(204, '');
			
			// Set Spy
			mockLocation.path = jasmine.createSpy();
			// Option2: // spyOn(mockLocation, 'path');
			
			// Call methods
			mockScope.loginUser();
			
			// Flush httpBackend - sends all captured callbacks
			$httpBackend.flush();
			
			// Test
			expect(mockLocation.path).toHaveBeenCalledWith('/viewLogged');
			
			// Fake http verification
			$httpBackend.verifyNoOutstandingExpectation();

		})); //inject
		
	}
);