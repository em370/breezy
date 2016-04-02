var Firebase = require('Firebase');
var ref = new Firebase("https://breezytalk.firebaseio.com");

ref.createUser({
  email    : "bobtony@firebase.com",
  password : "correcthorsebatterystaple"
});


