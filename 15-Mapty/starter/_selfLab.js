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
  el.addEventListener('input', () => {
    if (
      [inputDistance, inputDuration].every(
        el => el.value !== '' && !isNaN(+el.value) && isFinite(+el.value)
      )
    ) {
      // round to specific decimal: https://stackoverflow.com/a/12830454/14733188
      inputCadence.value =
        Math.round((inputDistance.value / inputDuration.value) * 100) / 100;
      btnSubmit.style.display = 'initial';
    } else {
      inputCadence.value = null;
      btnSubmit.style.display = 'none';
    }
  });
});
