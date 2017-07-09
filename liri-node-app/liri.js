var request = require("request"); 

request("", function(error, response, body) {

if (!error && response.statusCode === 200) {

console.log()
}

}); 

var Spotify = require('node-spotify api'); 

var spotify = new Spotify ({
	id: 1afd03f966a44c8e9c1a57983194a4ec, 
	secret: bc6f885321e84747927c637f700607a1
}); 

spotify.search({ type: 'track', query: 'My search query' })
.then(function(response) {
	console.log(response);
})
.catch(function(err) {
	console.log(error);
});