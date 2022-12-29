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

const getPosition = () => {
  // source idea: https://whatwebcando.today/articles/use-geolocation-api-promises/
  return new Promise(resolve =>
    navigator.geolocation.getCurrentPosition(
      position => resolve(position),
      () => {
        //  (TODO) not let app stop: offer user manual input (country name -> location of capital)
        //  use OSM API to return data: https://stackoverflow.com/a/63505853/14733188
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
        resolve(mockPosition);
      }
    )
  );
};

(async () => {
  // source idea: a Trà
  const {
    coords: { latitude, longitude },
  } = await getPosition();

  const coords = [latitude, longitude];

  // initilize Leaflet map: enable mouse, touch event (like bone)
  const map = L.map('map').setView(coords, 16);
  // add tile layer from OpenStreetMap via URL template (like skin)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19, // prevent continue scroll-in
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);
  const marker = L.marker(coords)
    .bindPopup('A pretty CSS3 popup.<br> Easily customizable.')
    .addTo(map);
  // (TODO) not zoom when double click on marker
  // add event click to get coordination + move marker
  map.on('click', e => {
    marker.setLatLng(e.latlng).addTo(map).openPopup();
    form.classList.remove('hidden');
  });
})();
