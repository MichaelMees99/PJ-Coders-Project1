//this is the Movie API, its currently set to grab information on avengers infinity war for reference.
const settings = {
	"async": true,
	"crossDomain": true,
	"url": "https://movie-database-alternative.p.rapidapi.com/?s=Avengers%20Endgame&r=json&page=1",
	"method": "GET",
	"headers": {
		"X-RapidAPI-Key": "29318d71f8msh332848e52019318p11c75ajsn9867f857f124",
		"X-RapidAPI-Host": "movie-database-alternative.p.rapidapi.com"
	}
};

$.ajax(settings).done(function (response) {
	console.log(response);
});

console.log(settings)