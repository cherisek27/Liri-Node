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

	case "do-what-it-says"; 
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
}; 

/*function myTweets() {
	var client = new twitter({
		consumer_key: keys.twitterKeys.consumer_key, 
		consumer_secret: keys.twitterKeys.consumer_secret, 
		access_token_key: keys.twitterKeys.access_token_key,
		access_token_secret: keys.twitterKeys.access_token_secret,
	});

	var twitterUsername = process.argv[3]; 
	if(!twitterUsername){
		twitterUsername = "Mz_CLK";
	}
	params = {screen_name: twitterUsername};
	client.get("statuses/user_timeline/", params, function(error, data, response){
		if(!error){
			for(var i = 0; i < data.length; i++) {
				var twitterResults = "@" + data[i].user.screen_name + ": " + 
				data[i].text + "\n" + 
				data[i].created_at + "\n" + 
				"------------------------------ " + i + " ------------------------------" + "\n";
			}
		}else {
			console.log("error: " + error);
			return;
		}
	}); 
}; 
*/

var getArtistNames = function(artist) {
  return artist.name;
};

//Function for finding songs on Spotify
var getMeSpotify = function(songName) {
  //If it doesn't find a song, find Blink 182's What's my age again
  if (songName === undefined) {
    songName = 'What\'s my age again';
  };

  spotify.search({ type: 'track', query: songName }, function(err, data) {
    if (err) {
      console.log('Error occurred: ' + err);
      return;
    }

    var songs = data.tracks.items;
    var data = []; //empty array to hold data

    for (var i = 0; i < songs.length; i++) {
      data.push({
        'artist(s)': songs[i].artists.map(getArtistNames),
        'song name: ': songs[i].name,
        'preview song: ': songs[i].preview_url,
        'album: ': songs[i].album.name,
      });
    }
    console.log(data);
    writeToLog(data);
  });
};

function doWhatItSays() {
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
	

