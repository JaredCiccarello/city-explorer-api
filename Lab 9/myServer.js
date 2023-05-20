'use strict';

console.log('our first server');
      //  REQUIRE
// Once we use require, we must use it.
// In node.js we use require like we do imports
// THESE MUST STAY AT THE TOP!

// let data = require('./data/weather.json'); WE won't need these for movies!

// This is like having a toolbox.
require('dotenv').config();

// These two do the same thing as line 13
// const dot = require('dotenv')
// dot.config()

// Express needs to be invoked before we use app.get 
// Express is the framework that we use to build a server
// Anytime we invoke a METHOD we need to use it
// We use methods by using const app.
// const express is asking express to put in our code toolbox.
const express = require('express');
const app = express();

// This gives us a list of methods that can be used to help build our framework
// app.

const cors = require('cors');
// CORS - cross origin resource sharing
// We use this if we want better security.
// Is this necessary?
app.use(cors());
const handleGetMovies = require('./modules/Movies')
// This creates an instance of the asynchronous function
const handleGetWeather = require('./modules/weather')


// This is different because it is requesting information not providing.






//USE
// This invokes using the name of the variable
app.get('/weather', handleGetWeather);
app.get('/movies', handleGetMovies);




//  PORT
// This will use our PORT and then use a logical OR to move to 3002 if 3001 is used.
const PORT = process.env.PORT || 3002;

// ROUTES












// Sheyna say's it works like this.


// let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;;


  
  app.get('*', (request, response) => {
    response.send('The thing you are looking for doesn\'t exist');
  });
  
  //  CLASSES
  // We need a new class for each object array of data that we are requesting from.


  // We still need error handling here
  

  
  

// LISTEN 
// use NODEMON command
app.listen(PORT, () => console.log(`listening on ${PORT}`));