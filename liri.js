var Twitter = require('twitter');

const chalk = require('chalk');

const log = console.log;

var keys = require('./keys.js');
 
var client = new Twitter(keys);
 
var params = {screen_name: 'Chr1sH4nner', count:20};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(chalk.bgBlue(chalk.bold(chalk.white(tweets[0].text))) + chalk.bgGreen(chalk.bold(chalk.white("\n Created at  " + tweets[0].created_at))));
  }
});

