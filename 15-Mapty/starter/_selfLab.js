// (TODO) do my own before watching
// 1. Listen: fill form Distance + Duration
// 2. calculate Cadence
// 3. show OK <button>

// Solution:
// 1. Listen 'change' of both input distance + duration
// 2. check whether both not empty
// 3. calculate the cadence
console.log(form.elements);

const [inputDistanceEL, inputTimeEl, inputCadenceEl, btnSubmit] = [
  [...form.elements].find(el => el.classList.contains('form__input--distance')),
  [...form.elements].find(el => el.classList.contains('form__input--duration')),
  [...form.elements].find(el => el.classList.contains('form__input--cadence')),
  [...form.elements].find(el => el.classList.contains('form__btn')),
];

[inputDistanceEL, inputTimeEl].forEach(el => {
  el.addEventListener('change', () => {
    if ([inputDistanceEL, inputTimeEl].every(el => el.value !== '')) {
      inputCadenceEl.value = inputDistanceEL.value / inputTimeEl.value;
      btnSubmit.style.display = 'initial';
    }
  });
});
