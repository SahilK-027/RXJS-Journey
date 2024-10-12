// observable.js
import { Observable } from "rxjs";

// Function to create and subscribe to an Observable
export function createAndSubscribe() {
  // Create a new observable to emit data
  const observable = new Observable((subscriber) => {
    // Emit the data
    subscriber.next(10);
    subscriber.next(20);
    subscriber.next(30);

    // Complete the observable
    subscriber.complete();
  });

  // Observer to handle emitted values
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
}
