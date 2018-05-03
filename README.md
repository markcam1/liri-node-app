# LIRI Node.js App
LIRI is a Language Interpretation and Recognition Interface.

This application will do the following in command line:
1.	Query the Twitter API and return tweets,
2.	Query the Spotify API and return a song’s specific details,
3.	Query the OMDB API and return movie’s specific details,
4.	Read a file and execute one of the commands above,
5.	And log the data from above into a log file.

*Note*: The Twitter functionality is limited to getting tweets, but it can be easily modified to search for tweets or write tweets with simple modifications. If you would like to see references on building a fully formed Twitter Bot check out Tutorial: [Writing a Node.js Twitter Bot](https://community.risingstack.com/node-js-twitter-bot-tutorial/). 

This production employs JavaScript, and a number Node.js packages.

---

![LIRI Node app](https://github.com/markcam1/liri-node-app/blob/master/media/liri_node.png)

---

## Setup
### Prerequisites
```
*	This is for those with intermediate JavaScript experience.
*	A basic knowledge of Node.js and the Command-line. 
```
### Installing
```
1) Clone this repo to your desktop.
2) Follow the instructions below.
```

### Instructions

1. Navigate to the root of your project and run npm init -y — this will initialize a package.json file for your project. 

2. Make a .gitignore file and add the following lines to it. This will tell git not to track these files, and thus they won't be committed to Github.

```
Setup Node.js and text editor
```

```
node_modules
.DS_Store
.env
```

1. Make a JavaScript file named keys.js.
2. Inside keys.js your file will look like this:

```
console.log('this is loaded');

exports.twitter = {
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
};

exports.spotify = {
  id: process.env.SPOTIFY_ID,
  secret: process.env.SPOTIFY_SECRET
};
```
Next, create a file named .env, add the following to it, replacing the values with your API keys (no quotes) once you have them:

```
# Spotify API keys

SPOTIFY_ID=your-spotify-id
SPOTIFY_SECRET=your-spotify-secret

# Twitter API keys

TWITTER_CONSUMER_KEY=your-twitter-consumer-key
TWITTER_CONSUMER_SECRET=your-twitter-consumer-secret
TWITTER_ACCESS_TOKEN_KEY=your-access-token-key
TWITTER_ACCESS_TOKEN_SECRET=your-twitter-access-token-secret
```

This file will be used by the dotenv package to set what are known as environment variables to the global process.env object in node. These are values that are meant to be specific to the computer that node is running on, and since we are gitignoring this file, they won't be pushed to github — keeping our API key information private.

## Usage
### What Each Command Should Do
1. `node liri.js my-tweets`

   * This will show your last 20 tweets in your terminal/bash window.

2. `node liri.js spotify-this-song '<song name here>'`

   * This will show the following information about the song in your terminal/bash window
     
     * Artist(s)
     
     * The song's name
     
     * A preview link of the song from Spotify
     
     * The album that the song is from

   * If no song is provided then your program will default to "The Sign" by Ace of Base.
   
   * I utilize the [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) package in order to retrieve song information from the Spotify API.
   
   * Like the Twitter API, the Spotify API requires you sign up as a developer to generate the necessary credentials. You can follow these steps in order to generate a **client id** and **client secret**:

   * Step One: Visit <https://developer.spotify.com/my-applications/#!/>
   
   * Step Two: Either login to your existing Spotify account or create a new one (a free account is fine) and log in.

   * Step Three: Once logged in, navigate to <https://developer.spotify.com/my-applications/#!/applications/create> to register a new application to be used with the Spotify API. You can fill in whatever you'd like for these fields. When finished, click the "complete" button.

   * Step Four: On the next screen, scroll down to where you see your client id and client secret. Copy these values down somewhere, you'll need them to use the Spotify API and the [node-spotify-api package](https://www.npmjs.com/package/node-spotify-api).

3. `node liri.js movie-this '<movie name here>'`

   * This will output the following information to your terminal/bash window:

     ```
       * Title of the movie.
       * Year the movie came out.
       * IMDB Rating of the movie.
       * Rotten Tomatoes Rating of the movie.
       * Country where the movie was produced.
       * Language of the movie.
       * Plot of the movie.
       * Actors in the movie.
     ```

   * If the user doesn't type a movie in, the program will output data for the movie 'Mr. Nobody.'
     
   * I use the request package to retrieve data from the OMDB API. Others will need to get an [API Key](http://www.omdbapi.com/apikey.aspx).

4. `node liri.js do-what-it-says`
   
   * Using the `fs` Node package, LIRI will take the text inside of random.txt and then use it to call one of LIRI's commands.
     
     * It should run `spotify-this-song` for "I Want it That Way," as follows the text in `random.txt`.
     
     * Feel free to change the text in that document to test out the feature for other commands.

### Logging

* In addition to logging the data to your terminal/bash window, I output the data to a .txt file called `log.txt`.

* Each command that runs writes the data to the `log.txt` file. 

* I do not overwrite the file each time a command is run.
---

## Built With
* [Node.js](https://nodejs.org/en/) - Node.js® is a JavaScript runtime built on Chrome's V8 JavaScript engine.
* [Twitter for Node.js](https://www.npmjs.com/package/twitter) - An asynchronous client library for the Twitter REST and Streaming API's.
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API.
* [request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. 
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file
* [moment](https://www.npmjs.com/package/moment) - A lightweight JavaScript date library for parsing, validating, manipulating, and formatting dates.

## Contributing
Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to me.

## Versioning
Use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/markcam1/liri-node-app/tags). 

## Authors
* **Mark Cameron** - *Initial work* - [Mark C](https://markcam1.github.io/)

See also the list of [contributors](https://github.com/markcam1/liri-node-app/graphs/contributors) who participated in this project.

## License
This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments
* UC Berkeley Extension
* Teachers [David Blanchard](https://www.linkedin.com/in/dblanchard13/), [Rai Lee](https://www.linkedin.com/in/rai-lee-38061696/), Emma Brown
* _“Wisdom is not a product of schooling but of the lifelong attempt to acquire it.”_ **― Albert Einstein** 