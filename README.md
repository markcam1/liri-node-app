# liri-node-app
IRI is a Language Interpretation and Recognition Interface.



## Getting Started
These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. 

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


## Built With

* [Node.js](https://nodejs.org/en/) - node
* [Twitter for Node.js](https://www.npmjs.com/package/twitter) - twitter api
* [node-spotify-api](https://www.npmjs.com/package/node-spotify-api) - A simple to use API library for the Spotify REST API.
* [request](https://www.npmjs.com/package/request) - Request is designed to be the simplest way possible to make http calls. 
* [dotenv](https://www.npmjs.com/package/dotenv) - Dotenv is a zero-dependency module that loads environment variables from a .env file

## Contributing

Please read [CONTRIBUTING.md](https://gist.github.com/PurpleBooth/b24679402957c63ec426) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Mark Cameron** - *Initial work* - [mc](https://github.com/#)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc
