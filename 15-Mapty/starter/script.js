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

/*  (TODO) share on Udemy: an option for non-access geolocation (privacy)
- want to use app but not want provide geolocation
- getCurrentPosition is async() -> must work via Callback or Promise
- write two options for learners
- mockPosition is plain object has barely information we need for this app
  (not full proprototype like original)
*/
/*    (TODO) not let app stop: offer user manual input
 - (improve idea) can prompt input city, and return random lat,lng from that
   (country name -> location of capital)
 - use OSM API to return data: https://stackoverflow.com/a/63505853/14733188
*/
const getPosition = () =>
  // convert callback to promise: https://whatwebcando.today/articles/use-geolocation-api-promises/
  new Promise(resolve =>
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

(async () => {
  // destruturing same line with fetch: a Trà
  const {
    coords: { latitude, longitude },
  } = await getPosition();
  const coords = [latitude, longitude];
  const map = L.map('map', { doubleClickZoom: false }).setView(coords, 16); // initilize Leaflet map: enable mouse, touch event (like bone)
  let tempMarker;
  let popupOptions = {};

  // add tile layer from OpenStreetMap via URL template (like skin)
  L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
    maxZoom: 19, // prevent continue scroll-in
    attribution:
      '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
  }).addTo(map);

  // reset form when popup (re)open
  map.on('popupopen', () => {
    form.reset();
    btnSubmit.style.display = 'none'; // (IDEA) find better way to sync submit btn with input
  });

  // add event click to get coordination + move marker
  map.on('click', mapEvent => {
    // (TODO) new marker cause focus on input field
    const { lat: latitude, lng: longitude } = mapEvent.latlng;
    const coords = [latitude, longitude];
    /*  (?) when call addTo(map) after openPopup(), popup won't open
    (assume) returned value (map,popup) effect subject of method
    - addTo(map) will trigger some autoClose behaviour of popup
     */
    popupOptions = {
      maxWidth: 250,
      minWidth: 100,
    };
    tempMarker = L.marker(coords)
      .bindPopup('Set your goal', popupOptions)
      .on('popupclose', function () {
        this.remove(); // make use of popup behaviour "autoclost,closeonclick"
        // (TODO) remove: when click another marker (which closes its popup)
      })
      .addTo(map)
      .openPopup();

    inputDistance.focus();
    form.classList.remove('hidden');
  });

  // form submitted -> marker persist + update popup content/options
  const addPersistMarkerOnSubmit = e => {
    e.preventDefault();
    tempMarker.off('popupclose');
    tempMarker
      .bindPopup('Workout', {
        ...popupOptions,
        autoClose: false,
        closeOnClick: false,
        className: 'running-popup',
      })
      .openPopup();

    // (IDEA) find official way to update popup (my way need to keep track previous option object)
    form.removeEventListener('submit', addPersistMarkerOnSubmit); // (FIXME) putting addEvent outside 'click' -> cause after remove, the submit can't re-added
  };
  form.addEventListener('submit', addPersistMarkerOnSubmit);

  // (FIXME) first multiple clicks will create diff marker/popup
})();
