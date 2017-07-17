//the request npm package 
var fs = require("fs");
var request = require("request"); 
var keys = require("./keys.js"); 
var twitter = require("twitter"); 
var spotify = require("spotify"); 
var liriArgument = process.argv[2]; 

//commands for liri app
switch(liriArgument) {
	case "movie-this":
	movieThis(); 
	break; 

	case "my-tweets": 
	myTweets(); 
	break;

	case "spotify-this-song": 
	spotifyThisSong(); 
	break;  

	case "do-what-it-says":
	doWhatItSays(); 
	break;
};

function movieThis() {
//store all of the arguments in an array 
var movie = process.argv[3];
	if(!movie){
		movie = "";
	}
	params = movie

//run a request to the OMDB API with the movie specified
var queryURL = "http://www.omdbapi.com/?t=" + params + "&y=&plot=short&apikey=40e9cece"; 

//this line is just to help us debug against the actual URL 
console.log(queryURL); 

request(queryURL, function(error, response, body) {
//if the request is successful 
	if(!error && response.statusCode === 200) {
		console.log("Movie Title: " + JSON.parse(body).Title + 
			"\nMovie Year: " + JSON.parse(body).Year + 
			"\nIMDB Movie Rating: " + JSON.parse(body).imdbRating + 
			"\nRotten Tamtoes Rating: " + JSON.parse(body).tomatoRating + 
			"\nCountry Movie Was Produced: " + JSON.parse(body).Country + 
			"\nLanguage of the Movie: " + JSON.parse(body).Language + 
			"\nPlot of the Movie: " + JSON.parse(body).Plot + 
			"\nActors in the Movie: " + JSON.parse(body).Actors);

	}else {
		console.log("error: " + error);
		return;
	}

}); 
} 

function myTweets() {
	var twitterUsername = process.argv[3]; 
	if(!twitterUsername){
		twitterUsername = "Mz_CLK";
	}
	var params = {
		q: "twitterUsername", 
		count: 20}

	client.get("search/tweets", params, gotData); 
	function gotData(err, data, response){
		var tweets = data.statuses; 
		for (var i = 0; i < tweets.length; i++){
			console.log(tweets[i].text;);
		}
	} 
/*function spotifyThisSong() {
	var songTitle = process.argv[4];
	var err = "";
	
	spotify.search({ type: "track", query: "I want it that way"}, function(error, data){
		if( err){
			console.log("Error occured: " + err);
			return; 
		} 
		if(process.argv[4]){
  			var data = data.tracks.items; 
  			for(var i = 0; i < data.length; i++){
  				console.log(data[i].artists.name);
  			  	console.log(data[i].name);
  				console.log(data[i].song); 
  				console.log(data[i].album.name);
  				console.log(data[i].preview_url);

  				for(var j = 0; j < data[i].artists.length; j++){
  					console.log(data[i].artists[j].name);
  				}
			}
		}
	}); 
} 
*/
/*function doWhatItSays() {
	var doWhatItSays = function() {
  	fs.readFile("random.txt", "utf8", function(error, data) {
    console.log(data);
    var dataArr = data.split(',')

    if (dataArr.length == 2) {
      pick(dataArr[0], dataArr[1]);
    } else if (dataArr.length == 1) {
      pick(dataArr[0]);
    }

  });
}
*/
