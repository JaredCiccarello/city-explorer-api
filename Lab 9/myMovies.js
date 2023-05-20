'use strict'

const axios = require('axios');

// let {lat, lon} = req.query.searchQuery;
// need the req URL from the API
// searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API

// the thing that the user is searching for:
// app.get('/movies', 


async function handleGetMovies (request, response, next) {
    try {
      console.log("request querey hERE: ", request.query);
      let city = request.query.cityName;
      let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
      console.log(movieURL)
      let movieData = await axios.get(movieURL);
      console.log(movieData)
      let movieMap = parseMovies(movieData.data.results);
      // console.log("HERE MOVIES: ", movieMap);
      movieMap.then(movie => {
        response.status(200).send(movie);
      })
  
    } catch (error) {
      console.log('You lost buddy?: ', error);
      next(error)
    }
  };
  
// Needing to find a way to export THIS
function parseMovies(moviesData) {
    // console.log("movdiesDATA HERE: ", moviesData);
    try {
      const movieSummarize = moviesData.map(oneMovie => {
        return new Movies(oneMovie);
      });
      return Promise.resolve(movieSummarize);
    } catch (error) {
      return Promise.reject(error);
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

  module.exports = handleGetMovies;
