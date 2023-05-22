'use strict';

// Lab code

const axios = require('axios');

let cache = require('./cache.js');
// const { reponse } = require ('express')


async function getWeather(request, response, next) {
  let latitude = request.query.lat;
  let longitude = request.query.lon;
  const key = 'weather-' + latitude + longitude;
  const url = `http://api.weatherbit.io/v2.0/forecast/daily/?key=${process.env.WEATHER_API_KEY}&lang=en&lat=${latitude}&lon=${longitude}&days=5`;
  
  if (cache[key] && (Date.now() - cache[key].timestamp < 50000)) {
    console.log('Cache hit');
  } else {
    console.log('Cache miss');
    cache[key] = {};
    cache[key].timestamp = Date.now();
    // AWAIT MUST happen before axios 
    let results = await axios.get(url)
    // .then(response => parseWeather(response.data));
    // console.log(result.data.data[0].high_temp)
    
    try {
      cache[key].data = results.data;
      let cityData = cache[key].data;
      let dataToGroom = cityData.data;
      let dataToSend = dataToGroom.map(object => {
        return new Weather(object);
      });
      response.status(500).send(dataToSend);
    } catch (error) {
      next(error)

    }
  }  
}

// function parseWeather(weatherData) {
//   try {
//     const weatherDataParsed = weatherData.data.map(day => {
//       return new Weather(day);
//     });
//     return Promise.resolve(weatherDataParsed)
//   } catch (error) {
//     return Promise.reject(error)
//   }
// }

class Weather {
  constructor(day) {
    this.forecast = day.weather.description;
    this.time = day.datetime;
    this.high = day.high_temp;
    this.low = day.low_temp
  }
}
module.exports = getWeather;