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

var composerName = "";
var albumName = "";
var songName = "";
var songPreview = "";
var spotLogArray = [];
var instructions;


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

  var spotInstructions = (instructions) ? instructions : 'The Sign Ace of Base';

      spotify.search({ type: 'track', query: spotInstructions, limit: 1 })
      .then(function(response) {

        var spotArr = response.tracks.items;
        spotArr.forEach(element => {
        albumName = element.album.name;
        artistTopArray = element.artists;
  
        for (key in artistTopArray ){
          console.log("\n-----------------------------------")
          artistTopArray.forEach(function(properties){ 
            composerName = properties.name,
            console.log("\nArtist/s: " + composerName)
          })
        }
        songName = element.name;
        songPreview = element.preview_url;
  
        console.log("Name of Song: " + songName)
        console.log("Preview of song: " + songPreview)
        console.log("Album Name: " + albumName)
        console.log("\n-----------------------------------")
        spotLogArray.push(instructions, composerName, albumName, songName, songPreview);
        liriLogger(spotLogArray)
        });
      })
      .catch(function(err) {
        console.log(err);
      });
    
}




function moviethis (instructions){
  console.log("moviethis")
  console.log(instructions)

  /*
  * Title of the movie.
  * Year the movie came out.
  * IMDB Rating of the movie.
  * Rotten Tomatoes Rating of the movie.
  * Country where the movie was produced.
  * Language of the movie.
  * Plot of the movie.
  * Actors in the movie.
  */


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

  /*
  If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
  If you haven't watched "Mr. Nobody," then you should: http://www.imdb.com/title/tt0485947/
  */

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


function liriLogger (inComingArr){

  console.log("inComingArr")
  console.log(inComingArr)
  console.log(inComingArr.length)

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

