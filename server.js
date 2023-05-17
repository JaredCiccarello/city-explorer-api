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

app.get('/', (request, response) => {
  response.send('hello');
});

app.get('/sayHello', (request, response) => {
  console.log('hi');
  console.log(request.query.firstName);
  let firstName = request.query.firstName;
  let lastName = request.query.lastName;
  response.send(`hi ${firstName} ${lastName}`);
});

app.get('/weather', (request, response, next) => {
  // http://localhost:3001/weather?cityData=seattle
  try {
    console.log('hi');
    let searchQuery = request.query.cityData;
    let city = data.find(cityData => cityData.city_name.toLowerCase() === searchQuery.toLowerCase())

    let dataMap = city.data.map(oneDay => new Forecast(oneDay));

    response.status(200).send(dataMap);
  } catch (error) {
    next(error);
  }
});

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

app.listen(PORT, () => console.log(`listening on ${PORT}`));