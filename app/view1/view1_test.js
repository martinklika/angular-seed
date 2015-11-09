'use strict';


describe('View1Ctrl', function() {
		
		// Everything we want to use here should be injectable by Angular
		// i.e. we create stuff Angular knows about
		// ANGULAR DOES NOT KNOW WHEN WE HAVE A DEPENDANCY
		
		// Register the Angular module
		beforeEach(module('myApp.view1'));
		
		// Declare controller
		var view1controller;
		
		// Declare other stuff...
		var mockScope;
		
		// Inject takes a function with injectable properties
		it('Test that it sets name to Martin', inject(function($controller) {
			
			// Dependencies
			mockScope = {};
			var mockUserService = {
				users: ['John']
			};
			
			var mockDependancy = {
				$scope: mockScope,
				userService: mockUserService
			};
				
			// Define controller
			view1controller = $controller('View1Ctrl', mockDependancy);	
			
			// TEST
			expect(mockScope.name).toEqual('Martin');
			expect(mockScope.names).toEqual(['John']);	
		})); //inject
		

	}
);