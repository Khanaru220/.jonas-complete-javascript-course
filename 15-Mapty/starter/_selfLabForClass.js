'use strict';

class Workout {
  constructor({ location, distance, time }) {
    // (IDEA) input form -> mix to object -> input to constructor()
    // (?) should we destructuring in param OR store a whole object then
    // - access needed props inside function's body
    this.location = location;
    this.distance = distance;
    this.time = time;
  }
}

class Running extends Workout {
  constructor({ location, distance, time }) {
    super({ location, distance, time });
  }
  get cadence() {
    return Math.round((this.distance / this.time) * 100) / 100;
  }

  // (?) should we use getter? - but this info (km, time) are constant
  // -no need updating
  // get cadence() {
  //   // distance / time (?step)
  // }
}
class Cycling extends Workout {
  constructor({ location, distance, time }) {
    super({ location, distance, time });
  }
  get elevation() {
    return Math.round((this.distance / this.time) * 100) / 100;
  }
}

class App {
  // (?) why need class for 'App', we could use variable 'App' instead. Will we have app1/app2?
  workouts = {};
  _map;
  _tempMarker;
  _popupOptions = {};
  constructor() {}
  _getPosition() {
    // convert callback to promise: https://whatwebcando.today/articles/use-geolocation-api-promises/
    return new Promise(resolve =>
      navigator.geolocation.getCurrentPosition(
        position => resolve(position),
        () => {
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
  }
  _loadMap(latitude, longitude) {
    this._map = L.map('map', { doubleClickZoom: false }).setView(
      [latitude, longitude],
      16
    ); // initilize Leaflet map: enable mouse, touch event (like bone)

    // add tile layer from OpenStreetMap via URL template (like skin)
    L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
      maxZoom: 19, // prevent continue scroll-in
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }).addTo(this._map);

    // reset form when popup (re)open
    this._map.on('popupopen', () => {
      form.reset();
      btnSubmit.style.display = 'none'; // (IDEA) find better way to sync submit btn with input
    });
    // add event click to get coordination + move marker
    this._map.on('click', this._showFormAndTempMarker.bind(this));
    // (!) urgly hack to sovle case: a method also a listener (this could be hanlder/class)
    // -another option: add event hanlder inside method; here, only for calling that method
    // -create _init() to add event hanlder to map + initial things
    this._toggleElementField();
  }
  _showFormAndTempMarker(mapEvent) {
    form.classList.remove('hidden');
    inputDistance.focus();

    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    // (?) when call addTo(map) after openPopup(), popup won't open
    // - (assume) returned value (map,popup) effect subject of method
    // - addTo(map) will trigger some autoClose behaviour of popup

    this._popupOptions = {
      maxWidth: 250,
      minWidth: 100,
    };

    this._tempMarker = L.marker([latitude, longitude], { opacity: 0.3 })
      .bindPopup('Set your goal', this._popupOptions)
      .on('popupclose', function () {
        this.remove(); // make use of popup behaviour "autoclost,closeonclick"
        // (TODO) remove: when click another marker (which closes its popup)
      })
      .addTo(this._map)
      .openPopup();
    // (!) non-pure function, relate with outter scope var: 'tempMarker';  cause order of functions executions matter
  }
  _toggleElementField() {
    let currentMeasureInput = inputCadence;

    const calculateMeasurement = () => {
      if (
        [inputDistance, inputDuration].every(
          el => el.value !== '' && !isNaN(+el.value) && isFinite(+el.value)
        )
      ) {
        // round to specific decimal: https://stackoverflow.com/a/12830454/14733188
        currentMeasureInput.value =
          Math.round((inputDistance.value / inputDuration.value) * 100) / 100;
        btnSubmit.style.display = 'initial';
      } else {
        currentMeasureInput.value = null;
        btnSubmit.style.display = 'none';
      }
    };

    const switchWorkoutTypeInput = () => {
      switch (inputType.value) {
        case 'running':
          // Sync result from current measurement
          inputCadence.value = currentMeasureInput.value;

          // Switch to new measurement
          currentMeasureInput = inputCadence;

          // Switch display
          inputElevation
            .closest('.form__row')
            .classList.add('form__row--hidden');
          break;
        case 'cycling':
          inputElevation.value = currentMeasureInput.value;

          currentMeasureInput = inputElevation;

          inputCadence.closest('.form__row').classList.add('form__row--hidden');
          break;
        default:
          break;
      }

      currentMeasureInput
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      // (TODO) it's seems i could make it less repeat
    };
    inputType.addEventListener('change', switchWorkoutTypeInput);

    [(inputDistance, inputDuration)].forEach(el => {
      el.addEventListener('input', calculateMeasurement);
    });
  }
}

// (TODO) (before watching video) try create instances + class App (woooo!)
const app = new App(); // (?) why should construct when load page?

const dataWorkoutSubmitted = {
  type: 'cycling',
  distance: +'12',
  time: +'20',
  // (?) where shoule we standardlize data (from input sources OR in function itself)
};

let instanceWorkout;

if (dataWorkoutSubmitted.type === 'running') {
  instanceWorkout = new Running(dataWorkoutSubmitted);
  // (TODO) store in App
} else if (dataWorkoutSubmitted.type === 'cycling') {
  instanceWorkout = new Cycling(dataWorkoutSubmitted);
}

// 1. take data from form
// 2. decide which class to create (Running / Cycling)

// ----- TEST AREA (start) -----

(async () => {
  // destruturing same line with fetch: a Trà
  const {
    coords: { latitude, longitude },
  } = await app._getPosition();

  app._loadMap(latitude, longitude);
})();

// let tempMarker;
// let popupOptions = {};

// // submit form -> marker persist + update popup content/options
// const addPersistMarkerOnSubmit = e => {
//   e.preventDefault();

//   if (!tempMarker) return;

//   // Display marker
//   tempMarker.off('popupclose');
//   tempMarker.setOpacity(1);
//   tempMarker
//     .bindPopup('Workout', {
//       ...popupOptions,
//       autoClose: false,
//       closeOnClick: false,
//       className: 'running-popup',
//     })
//     .openPopup();
//   // (IDEA) find official way to update popup (my way need to keep track previous option object)

//   // Reset form, prevent form re-submit with previous Marker
//   form.classList.add('hidden');
//   tempMarker = undefined;
// };
// form.addEventListener('submit', addPersistMarkerOnSubmit);
// // (?) should i put this function outside async()?

// ----- TEST AREA (end) -----
