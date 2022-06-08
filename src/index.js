// ### Import CSS Files ###
import './reset.css';
import './style.css';
// ### Import JS Modules ###
import {
  searchLocation,
  getFiveDayWeatherData,
  aggregateWeatherData,
  getCurrentWeather,
} from './api-functions';

import sampleWeather from './sample-data.json';
import { updateDailyView, updateCurrentWeatherView } from './dom-ui';

const searchbox = document.querySelector('input');
searchbox.addEventListener('keypress', async (key) => {
  if (key.code === 'Enter') {
    try {
      const coordinates = await searchLocation(searchbox.value);
      // eslint-disable-next-line object-curly-newline
      const { lat, lon, country, name } = coordinates[0];
      const currentWeather = await getCurrentWeather(lat, lon);
      const fiveDayWeather = await getFiveDayWeatherData(lat, lon);
      const aggregatedFiveDay = aggregateWeatherData(fiveDayWeather);
      console.log(coordinates);
      console.log(currentWeather);
      console.log(aggregatedFiveDay);

      updateCurrentWeatherView(country, name, currentWeather);
      updateDailyView(aggregatedFiveDay);
    } catch (error) {
      console.error(error);
      alert(error);
    }
  }
});
// Code segment for searching geolocation
// let timer = null;
// searchbox.addEventListener('keyup', (key) => {
//   if (key.code !== 'Enter' && searchbox.value !== '') {
//     clearTimeout(timer);
//     timer = setTimeout(() => searchLocation(searchbox.value), 500);
//   }
// });

// console.log(getFiveDayWeatherData(40.7127281, -74.0060152));
// console.log(sampleWeather);
console.log(aggregateWeatherData(sampleWeather));
