require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);



var movieName = process.argv[2];
var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
console.log(queryUrl);

request(queryUrl, function(error, response, body) {

  // If the request is successful
  if (!error && response.statusCode === 200) {

    // Parse the body of the site and recover just the imdbRating
    // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
    console.log("Release Year: " + JSON.parse(body).Year);
  }
});




// var movieName = "";

// // Parses the command line argument to capture the "operand" (add, subtract, multiply, etc) and the numbers
// var operand = inputString[2];
// var num1 = inputString[3];
// var num2 = inputString[4];
// // Here's the variable we will be modifying with the new numbers
// var outputNum;
// // Determines the operand selected...
// // Based on the operand we run the appropriate math on the two numbers
// if (operand === "add") {
//   outputNum = parseFloat(num1) + parseFloat(num2);
// }
// else if (operand === "subtract") {
//   outputNum = parseFloat(num1) - parseFloat(num2);
// }
// else if (operand === "multiply") {
//   outputNum = parseFloat(num1) * parseFloat(num2);
// }
// else if (operand === "divide") {
//   outputNum = parseFloat(num1) / parseFloat(num2);
// }
// else if (operand === "remainder") {
//   outputNum = parseFloat(num1) % parseFloat(num2);
// }
// else if (operand === "exp") {
//   outputNum = Math.pow(num1, num2);
// }
// else if (operand === "algebra") {
//   outputNum = parseAlgebra(num1);
// }
// else {
//   outputNum = "Not a recognized command";
// }
// // Prints the outputNumber
// console.log(outputNum);













// //movie
// for (var i = 2; i < nodeArgs.length; i++) {

//     if (i > 2 && i < nodeArgs.length) {
  
//       movieName = movieName + "+" + nodeArgs[i];
  
//     }
  
//     else {
  
//       movieName += nodeArgs[i];
  
//     }
//   }
  
//   // Then run a request to the OMDB API with the movie specified
//   var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
//   // This line is just to help us debug against the actual URL.
//   console.log(queryUrl);
  
//   request(queryUrl, function(error, response, body) {
  
//     // If the request is successful
//     if (!error && response.statusCode === 200) {
  
//       // Parse the body of the site and recover just the imdbRating
//       // (Note: The syntax below for parsing isn't obvious. Just spend a few moments dissecting it).
//       console.log("Release Year: " + JSON.parse(body).Year);
//     }
//   });


// spotify.search({ type: 'track', query: 'All the Small Things' }, function(err, data) {
//   if (err) {
//     return console.log('Error occurred: ' + err);
//   }
 
// console.log(data); 
// });

// //Search NEED COUNT = 20
// client.get('statuses/user_timeline', {screen_name: 'blaze_mcknight'}, function(error, tweets, response) {
//     console.log(tweets);
// });

// How about an example that passes parameters? Let's tweet something:
// client.post('statuses/update', {status: '2nd Tweet for api'},  function(error, tweet, response) {
//   if(error) throw error;
//   console.log(tweet);  // Tweet body. 
//   console.log(response);  // Raw response object. 
// });
  