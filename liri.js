require("dotenv").config();
var Spotify = require('node-spotify-api');
var axios = require("axios");
var fs = require("fs");
var moment = require("moment");
var keys = require("./keys.js");
var spotify = new Spotify(keys.spotify);

var type = process.argv[2];
var input = process.argv.slice(3).join(" ");



readLine(type, input);


function readLine(type, input){
    if(type === `concert-this`){
        var URL = "https://rest.bandsintown.com/artists/" + input + "/events?app_id=codingbootcamp";
        axios.get(URL).then(
            function(response){
                for (var i = 0; i<response.data.length; i++){
                    console.log("\n Venue Name: "+response.data[i].venue.name +"\n Venue Location: "+
                    response.data[i].venue.city+", "+response.data[i].venue.region+" "+
                    response.data[i].venue.country+"\n Date of the Event: "+
                    moment(response.data[i].datetime).format('l')+"\n\n----------");
    
                }
            }
        )
        
    
    }
    else if(type === `spotify-this-song`){
        spotify.search({ type: 'track', query: input}, function(err, data) {
            if (err) {
              return console.log('Error occurred: ' + err);
            }
           //console.log(data);
          for (var i = 0; i < data.tracks.items.length; i++){
              //console.log(data.tracks.items[i]);
              console.log("\nArtist: "+data.tracks.items[i].artists[0].name+"\nSong Name: "+
              data.tracks.items[i].name+"\nAlbum Name: "+data.tracks.items[i].album.name+"\n\n------");
          }
          });
    
    }
    else if(type ===  `movie-this`){
        var URL = "http://www.omdbapi.com/?t="+input+"&y=&plot=short&apikey=trilogy";
        axios.get(URL).then(
            function(response){
                console.log("\nTitle: "+response.data.Title+"\nYear: "+
                response.data.Year+"\nIMDB Rating: "+response.data.imdbRating+
                "\nRotten Tomatoes Rating: "+response.data.Ratings[1].Value+"\nCountry: "+
                response.data.Country+"\nLanguage: "+response.data.Language+"\nPlot: "+
                response.data.Plot+"\nActors: "+response.data.Actors+"\n\n-----");
            }
        )
        
    }
    else if(type === `do-what-it-says`){
        fs.readFile("random.txt","utf-8",function(error, data){
            if(error){
                return console.log(error);
            }
            var dataArr = data.split(",");
            type = dataArr[0];
            input = dataArr[1];
            readLine(type, input);
    
        });
    }

};