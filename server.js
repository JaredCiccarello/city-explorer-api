'use strict';

// LAB

// Must have .config or process.env will be unhappy
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const getWeather = require('./modules/weather.js');
const getMovies = require('./modules/movies.js');
const app = express();
app.use(cors());
const PORT = process.env.PORT || 3002 

app.get('/weather', getWeather);
app.get('/movies', getMovies);

function weatherHandler(request, response) {
  const { lat, lon } = request.query;
  weather(lat, lon)
  .then(summaries => response.send(summaries))
  .catch((error) => {
    console.error(error);
    response.status(200).send('Sorry. Something went wrong!')
  });
}  

app.get('*', (request, response) => {
  response.send('The thing you are looking for doesn\'t exist');
});

app.use((error, request, response, next) => {
  response.status(500).send(error.message)
});

app.listen(process.env.PORT, () => console.log(`Server up on ${PORT}`));