// angular.module firstly looks if module myApp.view1 exists
// if it does (like in this case) it adds additional functionality
// no dependencies are being passed in at this case
angular.module('myApp.view1')

// CREATE SERVICE
// its scope is module level (i.e. not for the entire application)
// it is being reference with the 'userService' name (handled by Angular)
// At this case there is no array after the identifier - we do not need it
.service('userService', function(){
  // this = current instance (kind of)
  // Create a list of users with elements Alpha and Beta
  this.users = ['Alpha', 'Beta'];
  // Create a function on "this" element
  // Take a String (called name) and push (add) it into the list
  this.addUser = function(name) {
    this.users.push(name);
  }
}
);