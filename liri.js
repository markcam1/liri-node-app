require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var action = process.argv[2]
var instructions = process.argv.slice(3).join("+")
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
var instructions;
var twitterText = "";
var twitterDateTime = "";
var omdbRating_imdb_Name = "";
var omdbRating_imdb_Val = "";
var spotLogArray = [];
var twitterLogArray = [];
var omdbLogArray = [];

if (!availableActions[action]) {
  return console.log('You must provide one of the following actions:\n', Object.keys(availableActions).join('\n'))
}

availableActions[action](instructions)

function mytweets() {
  client.get('statuses/user_timeline', {screen_name: 'blaze_mcknight', count: 20}, function(error, tweets, response) {
    if(error) throw error;

    tweets.forEach(function(tweetResponse){
      console.log("\n-----------------------------------")
      twitterText = tweetResponse.text;
      twitterDateTime = tweetResponse.created_at;
      console.log("Tweet text: " + twitterText )
      console.log("\nDate and Time: " + twitterDateTime )
      twitterLogArray.push("my-tweets", twitterText, twitterDateTime);
      liriLogger(twitterLogArray);
    })
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

  var movieName = (instructions) ? instructions : 'Mr.+Nobody';
  var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
  
  request(queryUrl, function(error, response, body) {
  
    if (!error && response.statusCode === 200) {
  
      omdbTitle = JSON.parse(body).Title;
      omdbYear = JSON.parse(body).Year;
      omdbRating = JSON.parse(body).Ratings;
      omdbCountry = JSON.parse(body).Country;
      omdbLanguage = JSON.parse(body).Language;
      omdbPlot = JSON.parse(body).Plot;
      omdbActors = JSON.parse(body).Actors;

      omdbRating.forEach(function(movieRatingObj){
        ratingObj = movieRatingObj;
        for (key in ratingObj){
          if (key == "Source"){
            if (ratingObj.Source == "Internet Movie Database"){
              omdbRating_imdb_Name = movieRatingObj.Source;
              omdbRating_imdb_Val = movieRatingObj.Value;
            }
            if (ratingObj.Source == "Rotten Tomatoes"){
              omdbRating_rotten_Name = movieRatingObj.Source;
              omdbRating_rotten_Val = movieRatingObj.Value;
            }
            else {
              omdbRating_rotten_Name = "Rotten Tomatoes" ;
              omdbRating_rotten_Val = "Not Available";
            }
          }
        }
      })

      console.log("\n-----------------------------------")
      console.log("Movie Title: " + omdbTitle);
      console.log("Release Year: " + omdbYear);
      console.log(omdbRating_imdb_Name + " Rating: " + omdbRating_imdb_Val);
      console.log(omdbRating_rotten_Name + " Rating: " + omdbRating_rotten_Val);
      console.log("Country: " + omdbCountry);
      console.log("Language: " + omdbLanguage);
      console.log("Plot: " + omdbPlot);
      console.log("Actors: " + omdbActors);
      console.log("\n-----------------------------------")
      
      omdbLogArray.push(instructions, queryUrl, omdbTitle, omdbYear, omdbRating_imdb_Name, omdbRating_imdb_Val,);
      omdbLogArray.push(omdbRating_rotten_Name + omdbRating_rotten_Val, omdbCountry + omdbLanguage + omdbPlot + omdbActors);
      liriLogger(omdbLogArray);
    }
  });
}


function dowhatitsays (instructions){
  console.log("dowhatitsays")
  console.log(instructions)

  /*
  node liri.js do-what-it-says
  Using the fs Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
  It should run spotify-this-song for "I Want it That Way," as follows the text in random.txt.
  Feel free to change the text in that document to test out the feature for other commands.
  */

  fs.readFile("random.txt", "utf8", function(error, data) {

    // If the code experiences any errors it will log the error to the console.
    if (error) {
      return console.log(error);
    }

    // We will then print the contents of data
    console.log(data);

    // Then split it by commas (to make it more readable)
    var dataArr = data.split(",");

    // We will then re-display the content as an array for later use.
    console.log(dataArr[0]);
    console.log(dataArr[1]);
    fsCommand = dataArr[0];
    fsInstructions = dataArr[1];
    spotifythissong(fsInstructions);

  });


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

  fs.appendFile("log.txt", "\n" + inComingArr, function(err) {

    // If an error was experienced we say it.
    if (err) {
      console.log(err);
    }

    // If no error is experienced, we'll log the phrase "Content Added" to our node console.
    else {
      console.log("Content Added!");
    }

  });


}

