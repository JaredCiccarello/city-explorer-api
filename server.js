'use strict';

console.log('our first server');



//  REQUIRE
// Once we use require, we must use it.

// let data = require('./data/weather.json'); WE won't need these for movies!

// This is like having a toolbox.
require('dotenv').config();
const express = require('express');
const cors = require('cors');
// This is different because it is requesting information not providing.
const axios = require('axios');

//USE

// const express is asking express to put in our code toolbox.
const app = express();
// CORS - cross origin resource sharing
// We use this if we want better security.
app.use(cors());
// Is this necessary?


//  PORT
// This will use our PORT and then use a logical OR to move to 3002 if 3001 is used.
const PORT = process.env.PORT || 3002;

// ROUTES

app.get('/weather', async (request, response, next) => {
  try {
// In order to make this URL go to https://www.weatherbit.io/api/weather-forecast-16-day
    let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${req.query.lat}&lon=${req.query.lon}`
    let weatherData = await axios.get(url);
// When we get the data from weatherData.data we need to parse the strings and then THAT value is returned to weatherMap
    let weatherMap = parseWeathers(weatherData.data);
    weatherMap.then(weather => {
      res.status(200).send(weather);
    })

  } catch (error) {
    next(error);
  }
});

// CLASS DEMO
app.get('/movies', async (request, response, next) => {
  // the thing that the user is searching for:
 
  // let {lat, lon} = req.query.searchQuery;
  // need the req URL from the API
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API

  try {
    console.log("request querey hERE: ", request.query);
    let city = request.query.cityName;
    let movieURL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.MOVIE_API_KEY}&query=${city}`
    let movieData = await axios.get(movieURL);
    let movieMap = parseMovies(movieData.data.results);
    // console.log("HERE MOVIES: ", movieMap);
    movieMap.then(movie => {
      response.status(200).send(movie);
    })

  } catch (error) {
    console.log('You lost buddy?: ', error);
    next(error)
  }
});


function parseWeathers(weatherData) {
  try {
    const weatherSummarize = weatherData.data.map(oneDay => {
      return new Forecast(oneDay);
    });
    return Promise.resolve(weatherSummarize);
  } catch (error) {
    return Promise.reject(error);
  }
};


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

// Sheyna say's it works like this.


  // let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;;
  // let photoData = await axios.get(url);

  // // console.log(photoData.data.results);
  // let picArray = photoData.data.results.map(pic => new Photo(pic));

  // res.status(200).send(picArray);

// });

  
  app.get('*', (request, response) => {
    response.send('The thing you are looking for doesn\'t exist');
  });
  
  //  CLASSES
  // We need a new class for each object array of data that we are requesting from.
  
  class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
      this.high = day.high_temp;
      this.low = day.low_temp;
    }
  }

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
  

// LISTEN 
// use NODEMON command
app.listen(PORT, () => console.log(`listening on ${PORT}`));