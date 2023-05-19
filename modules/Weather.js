'use strict'

const axios = require('axios');

// This entire block of code is a callback function.
// app.get('/weather',

// This is now an asynchronous function
async function handleGetWeather (request, response, next) {
    try {
  // In order to make this URL go to https://www.weatherbit.io/api/weather-forecast-16-day
      let url = `https://api.weatherbit.io/v2.0/forecast/daily?key=${process.env.WEATHER_API_KEY}&units=I&days=5&lat=${request.query.lat}&lon=${request.query.lon}`
      let weatherData = await axios.get(url);
  // When we get the data from weatherData.data we need to parse the strings and then THAT value is returned to weatherMap
      let weatherMap = parseWeathers(weatherData.data);
      weatherMap.then(weather => {
        response.status(200).send(weather);
      })
  
    } catch (error) {
      next(error);
    }
  };


function parseWeathers(weatherData) {
    try {
      // This maps over oneDay and then returns a new instance of Forecast called DAY and we name is oneDay because ?????
      const weatherSummarize = weatherData.data.map(oneDay => {
        return new Forecast(oneDay);
      });
      return Promise.resolve(weatherSummarize);
    } catch (error) {
      return Promise.reject(error);
    }
  };

class Forecast {
    constructor(day) {
      this.date = day.valid_date;
      this.description = day.weather.description;
      this.high = day.high_temp;
      this.low = day.low_temp;
    }
  }

  module.exports = handleGetWeather;