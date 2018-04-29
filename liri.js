require("dotenv").config();

var keys = require("./keys.js");

var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs')

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

var action = process.argv[2]
var instructions = process.argv.slice(3).join(" ")

var availableActions = {
  "my-tweets" : mytweets,
  "spotify-this-song" : spotifythissong,
  "movie-this" : moviethis, 
  "do-what-it-says" : dowhatitsays,
}


if (!availableActions[action]) {
  return console.log('You must provide one of the following actions:\n', Object.keys(availableActions).join('\n'))
}

availableActions[action](instructions)



function mytweets() {
  console.log("mytweets BETA")
  //Search NEED COUNT = 20
  client.get('statuses/user_timeline', {screen_name: 'blaze_mcknight'}, function(error, tweets, response) {
      //console.log(tweets);
      console.log(JSON.stringify(tweets, null, 2));
  });
  
}

function spotifythissong (instructions){
  console.log("spotifythissong")
  console.log(instructions)



  spotify.search({ type: 'track', query: 'All the Small Things', limit: 1 })
  .then(function(response) {
    console.log(response);
    console.log(JSON.stringify(response, null, 2));
  })
  .catch(function(err) {
    console.log(err);
  });


/*
This will show:
Artist(s)
The song's name
A preview link of the song from Spotify
The album that the song is from

If no song is provided then your program will default to "The Sign" by Ace of Base.

*/

  if (instructions){
    console.log("GOOD instructions")
    console.log(instructions)


    }
  else if (!instructions){
      console.log("BAD instructions")
      console.log(instructions)
    }


}




function moviethis (instructions){
  console.log("moviethis")
  console.log(instructions)

  var movieName = instructions;

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

}


function dowhatitsays (instructions){
  console.log("dowhatitsays ASSHOLE")
  console.log(instructions)

  /*
  node liri.js do-what-it-says
  Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  Feel free to change the text in that document to test out the feature for other commands.
  */



  // fs.readFile("movies.txt", "utf8", function(error, data) {

  //   // If the code experiences any errors it will log the error to the console.
  //   if (error) {
  //     return console.log(error);
  //   }

  //   // We will then print the contents of data
  //   console.log(data);

  //   // Then split it by commas (to make it more readable)
  //   var dataArr = data.split(",");

  //   // We will then re-display the content as an array for later use.
  //   console.log(dataArr);

  // });


}


function logger (){

    /*
  In addition to logging the data to your terminal/bash window, output the data to a .txt file called log.txt.
  Make sure you append each command you run to the log.txt file. 
  Do not overwrite your file each time you run a command.

  */

  // fs.appendFile(textFile, "Hello Kitty", function(err) {

  //   // If an error was experienced we say it.
  //   if (err) {
  //     console.log(err);
  //   }

  //   // If no error is experienced, we'll log the phrase "Content Added" to our node console.
  //   else {
  //     console.log("Content Added!");
  //   }

  // });


}

