'use strict';

console.log('our first server');



//  REQUIRE

const express = require('express');
require('dotenv').config();
let data = require('./data/weather.json');
const cors = require('cors');

//USE

const app = express();
app.use(cors());


//  PORT
const PORT = process.env.PORT || 3002;

// ROUTES


// CLASS DEMO
app.get('/weather', async (req, res, next) => {
  // probably need a try catch
  // the thing that the user is searching for:
 
  let {lat, lon} = req.query.searchQuery;
  // need the request URL from the API
  // searchQuery -   if the user is seraching for kittens, pass that value into the URL I'm sending the API

  let weatherUrl = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${lat}&lon=${lon}`;;
  let photoData = await axios.get(url);

  // console.log(photoData.data.results);
  let picArray = photoData.data.results.map(pic => new Photo(pic));

  res.status(200).send(picArray);

});
// CLASS DEMO
  
  app.get('*', (request, response) => {
    response.send('The thing you are looking for doesn\'t exist');
  });
  
  //  CLASSES
  
  class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
      this.high = day.high_temp;
      this.low = day.low_temp;
    }
  }
  


// LISTEN 
// NODEMON


// app.get('/', (request, response) => {
//   response.send('hello');
// });

// app.get('/weather', async (request, response, next) => {
//   // http://localhost:3001/weather?cityData=seattle
//   try {
    // This just shows what city the user is searching for

    // let {lat, lon} = request.query.searchQuery;
    // let url - `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}`
    // let weatherData = await axios.get(url);
    
//     let searchQuery = request.query.cityData;
//     // cityData is a searchQuery
//     let city = data.find(cityData => cityData.city_name.toLowerCase() === searchQuery.toLowerCase())

//     let dataMap = city.data.map(oneDay => new Forecast(oneDay));

//     response.status(200).send(dataMap);
//   } catch (error) {
//     next(error);
//   }
// });
app.listen(PORT, () => console.log(`listening on ${PORT}`));