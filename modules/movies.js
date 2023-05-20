'use strict'

const axios = require('axios');

let cache = require('./cache.js');

// let {lat, lon} = req.query.searchQuery;
// need the req URL from the API
// searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API

// the thing that the user is searching for:
// app.get('/movies', 


async function getMovies (request, response, next) {
      // console.log("request querey hERE: ", request.query);
      let city = request.query.cityName;
      // WHY ARE WE ADDING A - NEXT TO MOVIES???
      const key = 'movies-' + city;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
      console.log(url)
    

      if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
        console.log('Cache hit');
      } else {
        console.log('Cache miss');
        cache[key] = {};
        cache[key].timestamp = Date.now();
        // AWAIT MUST happen before axios 
        let movieData = await axios.get(url)


        // WHY IS THIS HAPPENING HERE BUT, NOT ON WEATHER.JS?
        try {
          cache[key].data = movieData.data.results;
          let movieDataToSend = cache[key].data.map(object => {
            return new Movies(object);
          });
          response.status(200).send(movieDataToSend)
        } catch (error) {
          next(error)

        // try {
        //   cache[key].data = results.data;
        //   let movieToSend = cache[key].data;
        //   let dataToGroom = cityData.data;
        //   let dataToSend = dataToGroom.map(object => {
        //     return new Weather(object);
        //   });
        //   response.status(200).send(dataToSend);
        // } catch (error) {
        //   next(error)
    
        }
      }  
    };


class Movies {
    constructor(movie) {
      this.title = movie.original_title;
      this.overview = movie.overview;
      this.averageVotes = movie.vote_average;
      this.totalVotes = movie.vote_count;
      this.image_url = movie.poster_path;
      this.popularity = movie.popularity;
      this.releaseDate = movie.release_date;
    }
  }

  module.exports = getMovies;
