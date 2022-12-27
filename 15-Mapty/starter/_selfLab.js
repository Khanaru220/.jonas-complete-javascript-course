// (TODO) do my own before watching
// 1. Listen: fill form Distance + Duration
// 2. calculate Cadence
// 3. show OK <button>

// Solution:
// 1. Listen 'change' of both input distance + duration
// 2. check whether both not empty
// 3. calculate the cadence
console.log(form.elements);

// init
// reset form each time load page
window.addEventListener('load', () => {
  form.reset(); // form of 'script.js'
});

const [inputDistanceEL, inputTimeEl, inputCadenceEl, btnSubmit] = [
  [...form.elements].find(el => el.classList.contains('form__input--distance')),
  [...form.elements].find(el => el.classList.contains('form__input--duration')),
  [...form.elements].find(el => el.classList.contains('form__input--cadence')),
  [...form.elements].find(el => el.classList.contains('form__btn')),
];

[inputDistanceEL, inputTimeEl].forEach(el => {
  el.addEventListener('change', () => {
    if ([inputDistanceEL, inputTimeEl].every(el => el.value !== '')) {
      inputCadenceEl.value =
        Math.round((inputDistanceEL.value / inputTimeEl.value) * 100) / 100; // source idea: https://stackoverflow.com/a/12830454/14733188
      btnSubmit.style.display = 'initial';
    }
  });
});
