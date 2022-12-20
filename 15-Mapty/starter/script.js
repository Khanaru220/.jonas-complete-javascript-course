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
      // (TODO) not let app stop: offer user manual input (country name -> location of capital)
      alert('Could not get your position');
    }
  );
} */

console.log(mockPosition);
