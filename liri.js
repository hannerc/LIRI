var Twitter = require('twitter');

const chalk = require('chalk');

const log = console.log;

var keys = require('./keys.js');
 
var client = new Twitter(keys);

var request = require('request');

var Spotify = require('node-spotify-api');

const inquirer = require("inquirer");


 inquirer
  .prompt([ 
  	{type: "list",
      message: "Which command do you choose?",
      choices: ["my-tweets", "spotify-this-song","movie-this","do-what-it-says"],
      name: "command"
  }])
  .then(function(inquirerResponse) {
  	
  	if (inquirerResponse.command === "my-tweets"){
  		mytweets();
  	}else if(inquirerResponse.command === "spotify-this-song"){
  		console.log("Spotify");
  		inquirer
		  .prompt([
		    {
		      type: "input",
		      message: "What song?",
		      name: "song" 
		  	}])
		  .then(function(songname){
		  	if (songname.song === ""){
		  	spotify("The Sign Ace of Base");;
		  }else{
		  	spotify(songname.song);
		  }
		 });
  	}else if(inquirerResponse.command === "movie-this"){
  		console.log("Movie This")
  		inquirer
		  .prompt([
		    {
		      type: "input",
		      message: "What movie?",
		      name: "movie" 
		  	}])
		  .then(function(moviename){
		  	if (moviename.movie === ""){
		  	OMDB("Mr. Nobody");;
		  }else{
		  	OMDB(moviename.movie);
		  }
		 });
  	}else if(inquirerResponse.command === "do-what-it-says"){
  		console.log("do");
  	};

  });

//var input = process.argv.slice(2);


function spotify(songname){

var spotify = new Spotify({
  id: "d7753c788e674f92ab405c0b92251769",
  secret: "69aca417190345c5a82c3e6548b17f4b"
});
 
spotify.search({ type: 'track', query: songname, limit:1}, function(err, data) {
  if (err) {
    return console.log('Error occurred: ' + err);
  }
console.log("Song Name "+ songname); 
console.log("Album Name " + data.tracks.items[0].album.name);
console.log("Artist " + data.tracks.items[0].album.artists[0].name); 
console.log("Open in Spotify "+ data.tracks.items[0].album.artists[0].external_urls.spotify); 

});
}

function OMDB(moviename){
	request('http://www.omdbapi.com/?apikey=40e9cece&t='+moviename, function (error, response, body) {
	
	if (error){
		console.log('error:', error); // Print the error if one occurred
	}else{
		//console.log(JSON.parse(body));
		console.log('Title: ' + JSON.parse(body).Title);
		console.log('Rating: ', JSON.parse(body).Ratings[0].Source + " " + JSON.parse(body).Ratings[0].Value);
		if(typeof JSON.parse(body).Ratings[1] !== 'undefined') {
    // does exist
   		console.log('Rating: ', JSON.parse(body).Ratings[1].Source + " " + JSON.parse(body).Ratings[1].Value);
		}
		console.log('Country: ', JSON.parse(body).Country);
		console.log('Language: ', JSON.parse(body).Language);
		console.log('Plot: ', JSON.parse(body).Plot);
		console.log('Actors: ', JSON.parse(body).Actors);
	}
})
};

function mytweets(){

var params = {screen_name: 'Chr1sH4nner', count:20};
client.get('statuses/user_timeline', params, function (error, tweets, response) {
  if (!error) {
    console.log(chalk.bgBlue(chalk.bold(chalk.white(tweets[0].text))) + chalk.bgGreen(chalk.bold(chalk.white("\n Created at  " + tweets[0].created_at))));
  }
});

};