// (TODO) do my own before watching
// 1. Listen: fill form Distance + Duration
// 2. calculate Cadence
// 3. show OK <button>

// Solution:
// 1. Listen 'change' of both input distance + duration
// 2. check whether both not empty
// 3. calculate the cadence

const btnSubmit = document.querySelector('.form__btn');
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

// init
// reset form each time load page
window.addEventListener('load', () => {
  form.reset(); // form of 'script.js'
});

inputType.addEventListener('change', function () {
  switch (this.value) {
    case 'running':
      // Sync result from current measurement
      inputCadence.value = currentMeasureInput.value;

      // Switch to new measurement
      currentMeasureInput = inputCadence;

      // Switch display
      currentMeasureInput
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputElevation.closest('.form__row').classList.add('form__row--hidden');
      break;
    case 'cycling':
      inputElevation.value = currentMeasureInput.value;

      currentMeasureInput = inputElevation;

      currentMeasureInput
        .closest('.form__row')
        .classList.remove('form__row--hidden');
      inputCadence.closest('.form__row').classList.add('form__row--hidden');
      break;
    default:
      break;
  }

  // (TODO) it's seems i could make it less repeat
});

[(inputDistance, inputDuration)].forEach(el => {
  el.addEventListener('input', calculateMeasurement);
});
