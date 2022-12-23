'use strict';

// prettier-ignore
const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

const form = document.querySelector('.form');
const containerWorkouts = document.querySelector('.workouts');
const inputType = document.querySelector('.form__input--type');
const inputDistance = document.querySelector('.form__input--distance');
const inputDuration = document.querySelector('.form__input--duration');
const inputCadence = document.querySelector('.form__input--cadence');
const inputElevation = document.querySelector('.form__input--elevation');

const mockPosition = {
  coords: {
    accuracy: 1446,
    altitude: null,
    altitudeAccuracy: null,
    heading: null,
    latitude: 52.5082624,
    longitude: 13.2972544,
    speed: null,
  },
  timestamp: 1567849894270,
};

/* Use mock object instead
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
    position => {
      console.log(position);
    },
    () => {
      /*
       (TODO) not let app stop: offer user manual input (country name -> location of capital)
       use OSM API to return data: https://stackoverflow.com/a/63505853/14733188 */ /*
       
      alert('Could not get your position');
    }
  );
}
*/
const { latitude, longitude } = mockPosition.coords;
const coords = [latitude, longitude];
const GGMapURL = `https://www.google.com/maps/@${latitude},${longitude},18.04z`;
console.log(GGMapURL);

// initilize Leaflet map: enable mouse, touch event (like bone)
const map = L.map('map').setView(coords, 16);

// add tile layer from OpenStreetMap via URL template (like skin)
L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
  maxZoom: 19, // prevent continue scroll-in
  attribution:
    '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const marker = L.marker(coords).addTo(map);
