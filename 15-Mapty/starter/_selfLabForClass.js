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
    this.cadence = Math.round((distance / time) * 100) / 100;
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
    this.elevation = Math.round((distance / time) * 100) / 100;
  }
  // get elevation() {
  //   // distance / time
  // }
}

class App {
  constructor() {}
}

// (TODO) (before watching video) try create instances + class App (woooo!)
