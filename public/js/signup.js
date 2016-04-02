var Firebase = require('Firebase');
var ref = new Firebase("https://breezytalk.firebaseio.com");

console.log('the file ran!');

var submit = document.getElementById("submit-button");
console.log(submit);

submit.addEventListener('click', function() {
    alert('Hello world');
    ref.createUser({
      email    : "bobtony@firebase.com",
      password : "correcthorsebatterystaple"
    }, function(error, userData) {
      if (error) {
        console.log("Error creating user:", error);
      } else {
        console.log("Successfully created user account with uid:", userData.uid);
      }
    });
}, false);

