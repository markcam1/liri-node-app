require("dotenv").config();
var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require('fs')
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var moment = require('moment');


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
var spotInstructions = "";
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
              omdbRating_rotten_Name = "Rotten Tomatoes: " ;
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
      
      omdbLogArray.push(movieName, queryUrl, omdbTitle, omdbYear, omdbRating_imdb_Name, omdbRating_imdb_Val,);
      omdbLogArray.push(omdbRating_rotten_Name + omdbRating_rotten_Val, omdbCountry + omdbLanguage + omdbPlot + omdbActors);
      liriLogger(omdbLogArray);
    }
  });
}


function dowhatitsays (instructions){

  fs.readFile("random.txt", "utf8", function(error, data) {

    if (error) {
      return console.log(error);
    }
    var dataArr = data.split(",");
    fsCommand = dataArr[0];
    fsInstructions = dataArr[1];
    spotifythissong(fsInstructions);
  });
}

function liriLogger (inComingArr){

  var formatted = moment().format('YYYY-MM-DD HH:mm:ss Z');
  inComingArr.unshift(formatted)
  
  var logString = inComingArr.join("|");
  var logArray = new Array();
  logArray = logString;

  fs.appendFile("log.txt", "\n" + logArray, function(err) {

    if (err) {
      console.log(err);
    }
    else {
      console.log("Content Added!");
    }
  });
}

var formatted = moment().format('YYYY-MM-DD HH:mm:ss Z');
console.log("time: " + formatted)

