// Initialize Firebase
module.exports = (firebase) => {
  var config = {
    apiKey: "AIzaSyDJZok9WSenbpDda6PPQuDtNocbKXddPzU",
    authDomain: "dinnerjacket-1e21c.firebaseapp.com",
    databaseURL: "https://dinnerjacket-1e21c.firebaseio.com",
    projectId: "dinnerjacket-1e21c",
    storageBucket: "",
    messagingSenderId: "456112483408"
  };
  if (!firebase.apps.length) {
    firebase.initializeApp(config)
  }
} 