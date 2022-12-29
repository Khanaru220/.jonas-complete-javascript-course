// (TODO) do my own before watching
// 1. Listen: fill form Distance + Duration
// 2. calculate Cadence
// 3. show OK <button>

// Solution:
// 1. Listen 'change' of both input distance + duration
// 2. check whether both not empty
// 3. calculate the cadence

const btnSubmit = document.querySelector('.form__btn');

// init
// reset form each time load page
window.addEventListener('load', () => {
  form.reset(); // form of 'script.js'
});

[inputDistance, inputDuration].forEach(el => {
  el.addEventListener('change', () => {
    if ([inputDistance, inputDuration].every(el => el.value !== '')) {
      inputCadence.value =
        Math.round((inputDistance.value / inputDuration.value) * 100) / 100; // source idea: https://stackoverflow.com/a/12830454/14733188
      btnSubmit.style.display = 'initial';
    }
  });
});
