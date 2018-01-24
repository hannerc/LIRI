var Twitter = require('twitter');

const chalk = require('chalk');

const log = console.log;

var keys = require('./keys.js');
 
var client = new Twitter(keys);

var request = require('request');

var Spotify = require('node-spotify-api');

const inquirer = require("inquirer");

const fs = require('fs');


 inquirer
  .prompt([ 
  	{type: "list",
      message: "Which command do you choose?",
      choices: ["my-tweets", "spotify-this-song","movie-this","do-what-it-says"],
      name: "command"
  }])
  .then(function(inquirerResponse) {
  	
  	if (inquirerResponse.command === "my-tweets"){
  		inquirer
		  .prompt([
		    {
		      type: "input",
		      message: "What screen name? @",
		      name: "username" 
		  	}])
		  .then(function(username){
		  	if (username.username === ""){
		  	mytweets("Chr1sH4nner");;
		  }else{
		  	mytweets(username.username);;
		  }
		 });
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
  		doWhatItSays();
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
});
};

function mytweets(username){

var params = {screen_name: username, count:20};

client.get('statuses/user_timeline', params, function (error, tweets, response) {
  		if (!error) {
  			for (i=0; i<tweets.length; i++){
  		//console.log(tweets[i].text)
  		console.log(chalk.blue(chalk.bold(((i+1)+" "+tweets[i].text))) + chalk.green(chalk.bold(("\n Created at  " + tweets[i].created_at))));	
  	};
  };
});
};



function doWhatItSays(){

	fs.readFile('random.txt', 'utf8', (err, data) => {
	  if (err) throw err;
	  //console.log(typeof(data));
	  var doThis = data.split(",");
	  //console.log(doThis);
	  var operation = doThis[0];
	  //console.log(operation);
	  var stringArray = doThis.slice(1);
	  var Searchstring = stringArray.join(" ")
	  //console.log(Searchstring);

	  if (operation = "spotify-this-song"){
	  	spotify(Searchstring);
	  }else if(operation = "movie-this"){
	  	OMDB(Searchstring);
	  }else if(operation = "my-tweets"){
	  	mytweets();
	  }

});
}




