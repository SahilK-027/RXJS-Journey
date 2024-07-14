const { Observable } = require("rxjs");

// Create a new observable to emit data
// Observables are lazy, meaning they don't start emitting values until you subscribe to them
const observable = new Observable((subscriber) => {
  // Emit the data
  subscriber.next(10);

  // Observable can emit multiple values
  subscriber.next(20);
  subscriber.next(30);

  // Complete the observable
  subscriber.complete();
});

const observer = {
  next: (value) => {
    console.log("Observer received value:", value);
  },
  error: (err) => {
    console.log("ERROR:", err);
  },
  complete: () => {
    console.log("COMPLETE status");
  },
};

// Connect observable with observer
observable.subscribe(observer);
