# RXJS-Journey

This repo is a collection of my learnings, experiments, and code snippets from the world of RxJS.

## 🔹 What is RXJS?

RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs. It is a powerful tool for managing data streams and handling asynchronous operations in a declarative way. RxJS is often used in Angular to handle asynchronous events and data streams, making it easier to work with HTTP requests, WebSockets, user input events, and more, but it is not only limited to be used only in AngularJS alone. RxJS can be used in any JavaScript environment, including Node.js and other front-end frameworks like React and Vue.js or even in normal vanillaJS + HTML projects.

## 🔹 Installation

You can checkout the installation process [here](https://rxjs.dev/guide/installation).

But one thing to note is that when we are using `RXJS in angular project` we don't need to install it separately.

## 🔹 File structure

This is the way I have maintained file structure of this repo. All the corresponding codes are in respective directories.

```md
RXJS-Journey/
│
├── 1-RXJS-basics/ (Information about observables, observers, subscriber)
│ └── index.js
│
│
└── 2-RXJS-pipe/ (Information about pipe and operators)
└── index.js
```

## 🔹 1-RXJS-basics

Before starting our `RXJS in angular` journey we will first keep it framework agnostic. We will first work in Vanilla JS.

Creating the codebase:

```bash
mkdir 1-RXJS-basics
cd 1-RXJS-basics
npm init -y
touch index.js
npm install rxjs
```

### RXJS is ready to rock!

So now we are going to actually begin learning about the exciting world of RXJS. And a great starting point would be to understand about data stream and observables.

### Data Streams

A data stream is a sequence of ongoing events ordered in time. It can be anything that continuously emits values, such as user inputs, network requests, or even a sequence of numbers.

- Analogy: Think of a data stream as a radio broadcast. A radio station constantly sends out signals (data) in the form of radio waves. This continuous flow of information is like a data stream in RXJS.

### Observables

In RxJS, an Observable is a blueprint for creating data streams and the core primitive for working with asynchronous data. Observables are lazy, meaning they don't start emitting values until you subscribe to them.

- Analogy:
  An observable in RXJS is like a radio station transmitter. It sets up the broadcast and defines what will be transmitted. However, until someone tunes in, the broadcast doesn't affect anyone.

### Subscribers

Now, think of a subscriber as a radio listener. When you turn on your radio and tune in to a specific station, you start receiving the broadcast. Similarly, in RXJS, when you subscribe to an observable, you start receiving the data emitted by that observable.

### Let's code it:

Here is a simple example to demonstrate the creation and subscription of an Observable in RxJS:

```javascript
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
```

### Output:

When you run the above code, the output will be:

```yaml
Observer received value: 10
Observer received value: 20
Observer received value: 30
COMPLETE status
```

Explanation:

1. Create Observable: Using the Observable constructor, we create an observable that emits values.
2. Subscriber: Inside the observable, we use subscriber.next() to emit values.
3. Observer: We define an observer object with next, error, and complete methods to handle the emitted values, errors, and completion notifications respectively.
4. Subscribe: We connect the observable with the observer by calling observable.subscribe(observer), which starts the data emission.

## 🔹 2-RXJS-pipe

The pipe method in RxJS is used to compose operators to transform, filter, and manipulate streams of data emitted by an Observable. It's a powerful feature that allows you to build complex data processing pipelines in a clean and readable manner.

Key Concepts of pipe:

- Composition: You can chain multiple operators together to create a data processing pipeline.
- Immutability: Each operator returns a new Observable, leaving the original Observable unchanged.
- Readability: Using pipe enhances the readability of your code by clearly showing the sequence of operations applied to the data stream.

Creating the codebase:

```bash
mkdir 2-rxjs-pipe
cd 2-rxjs-pipe
npm init -y
touch index.js
npm install rxjs
```

### Let's understand it with code

```javascript
const { Observable } = require("rxjs");
// Import operator
const { map, filter, flatMap } = require("rxjs/operators");

// Sample API data
const APIdata = {
  users: [
    { name: "Alice", status: "active", age: 24 },
    { name: "Bob", status: "inactive", age: 18 },
    { name: "Charlie", status: "active", age: 11 },
    { name: "David", status: "inactive", age: 16 },
    { name: "Eve", status: "active", age: 12 },
    { name: "Frank", status: "active", age: 25 },
    { name: "Grace", status: "inactive", age: 18 },
  ],
};

let observable = new Observable((subscriber) => {
  subscriber.next(APIdata);
}).pipe(
  // Map to convert object to users array
  map((receivedAPIData) => {
    return receivedAPIData.users;
  }),
  // filter based on status active
  map((allUsers) => {
    return allUsers.filter((user) => user.status === "active");
  }),
  // Get the average age of all the active users
  map((activeUsers) => {
    const totalAge = activeUsers.reduce((sum, user) => {
      return sum + user.age;
    }, 0);

    return totalAge / activeUsers.length;
  }),
  // Error handling
  map((avgAge) => {
    if (avgAge < 18) {
      throw `All active users are too young`;
    } else {
      return avgAge;
    }
  })
);

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
```

### Steps Breakdown:

1. Create Observable: new Observable((subscriber) => { ... }): Initializes an Observable that emits the APIdata object.

2. Pipe Method: pipe(...): Chains multiple operators together to transform the data emitted by the Observable.

3. First map Operator: map((receivedAPIData) => receivedAPIData.users): Transforms the emitted APIdata object into an array of users.

4. Second map Operator: map((allUsers) => allUsers.filter((user) => user.status === "active")): Filters out users who have an "active" status.

5. Third map Operator: map((activeUsers) => { ... }): Calculates the average age of all active users using reduce.

6. Fourth map Operator (Error Handling): map((avgAge) => { ... }): Checks if the average age (avgAge) of active users is less than 18. If so, throws an error; otherwise, returns avgAge.

7. Observer: Defines an object with next, error, and complete methods to handle emitted values, errors, and completion status from the Observable.

8. Subscription: observable.subscribe(observer);: Connects the Observable (observable) to the observer (observer) to start receiving values.


## Understanding RxJS Operators

Operators allow us to manipulate the data emitted by Observables, making it easier to process and respond to various events.

Each operator serves a specific purpose and can significantly improve the readability and efficiency of our code. We will start with the `map` operator, a fundamental tool in the RxJS toolbox. 

> Note: For this blog, I have selected a few operators that we usually use in our day-to-day coding from the Fyle codebase. Each operator will be explained with simple examples, focusing on how they can be applied in real-world scenarios. Let's get started!
> 

### **1. `tap` for the side effects 🚰**

The `tap` operator is used to perform side effects for notifications from the source Observable without changing the emitted values.

**When to Use?**

⇒ Use `tap` for logging, debugging, or any side-effect actions without modifying the data stream.

CODE: 

```jsx
import { of } from 'rxjs';
import { tap } from 'rxjs/operators';

// Observable emitting numbers
const numbers$ = of(1, 2, 3);

// Using tap to log values before processing
numbers$
  .pipe(
    tap((num) => console.log("Data to log:", num)), // Log the emitted data
  )
  .subscribe((result) => console.log("Emitted data:", result)); // Log the emitted result
```

OUTPUT:

```jsx
// Output:
Data to log 1
Emitted data: 1
Data to log 2
Emitted data: 2
Data to log 3
Emitted data: 3
```

### **2. `map` to transform emitted values 🗺️**

The `map` operator is used to transform the items emitted by an Observable by applying a specified function to each item.

**When to Use?**

⇒ Use `map` when you want to modify or transform the data that an Observable emits without changing the order of emissions.

CODE: 

```jsx
import { of } from 'rxjs';
import { map } from 'rxjs/operators';

// Observable emitting numbers
const numbers$ = of(1, 2, 3, 4, 5);

// Using map to square each number
const squares$ = numbers$.pipe(map((num) => num * num));

squares$.subscribe((result) => console.log("Squared:", result));
```

OUTPUT:

```jsx
// Output:
Squared: 1
Squared: 4
Squared: 9
Squared: 16
Squared: 25
```

### **3. `filter` to include only certain items 🫥**

The `filter` operator is used to emit only those items from an Observable that meet a specified condition.

**When to Use?**

⇒ Use the`filter` operator when you want to include only certain items based on a condition.

CODE: 

```jsx
import { of } from 'rxjs';
import { filter } from 'rxjs/operators';

// Observable emitting numbers
const numbers$ = of(1, 2, 3, 4, 5, 6);

// Using filter to get even numbers
const evenNumbers$ = numbers$.pipe(
  filter(num => num % 2 === 0)
);

evenNumbers$.subscribe(result => console.log('Even:', result));
```

OUTPUT:

```jsx
// Output:
Even: 2
Even: 4
Even: 6
```

### **4. `zip` to combine each value in a pairwise fashion 🫂**

The `zip` operator is used to combine the latest values from multiple Observables into a single emitted value.

**When to Use?**

The `zip` operator is best suited for scenarios where you want to combine the emitted values from multiple Observables such that each emitted value is paired with the corresponding emitted value from the other Observables.

### Example Overview:

We have two observables:

1. `observableA$`: Emits the values `[1, 2, 3]` with specific delays.
2. `observableB$`: Emits the values `[10, 20, 30]` with specific delays.

The `zip` operator is used to combine the values emitted by `observableA$` and `observableB$`. It waits for each observable to emit a value, then pairs them together and performs an operation (in this case, summing the two values).

CODE: 

```jsx
import { concat, of, zip } from "rxjs";
import { delay, map } from "rxjs/operators";

// Two observables emitting numbers
// ObservableA: [1 (1st emit), 2 (3rd emit), 3 (4th emit)]
const observableA$ = concat(
  of(1).pipe(delay(0)), // Emit 1 immediately
  of(2).pipe(delay(200)), // Emit 2 after 0.2 seconds
  of(3).pipe(delay(300)), // Emit 3 after 0.3 second
);

// Observable2: [10 (2nd emit), 20 (5th emit), 30 (6th emit)]
const observableB$ = concat(
  of(10).pipe(delay(100)), // Emit 10 after 0.1 second
  of(20).pipe(delay(400)), // Emit 20 after 0.4 seconds
  of(30).pipe(delay(500)), // Emit 30 after 0.5 second
);

// Using zip to add the values from both observables
zip([observableA$, observableB$])
  .pipe(map(([a, b]) => a + b))
  .subscribe((result) => console.log("Zipped sum:", result));

```

OUTPUT:

```jsx
// Output:
Zipped sum: 11
Zipped sum: 22
Zipped sum: 33
```

### Emission Sequence:

Here’s the order in which the values are emitted:

1. **Time 0ms**: `observableA$` emits `1` immediately. `zip` waits for `observableB$` to emit.
2. **Time 100ms**: `observableB$` emits `10`. Now `zip` has a pair of values. It combines `1` from `observableA$` and `10` from `observableB$`, sums them (`1 + 10`), and emits `11`.
3. **Time 200ms**: `observableA$` emits `2`. `zip` waits for the next value from `observableB$`.
4. **Time 500ms**:
    - `observableA$` emits `3` (300ms delay after the previous emission).
    - Almost simultaneously, `observableB$` emits `20` (400ms delay after its previous emission).
    - `zip` now has the second pair of values. It combines `2` from `observableA$` (the value that was waiting) and `20` from `observableB$`, sums them (`2 + 20`), and emits `22`.
5. **Time 1000ms**: `observableB$` emits `30` (500ms delay after its previous emission). `zip` already has `3` waiting from `observableA$`, so it immediately pairs these values, sums them (`3 + 30`), and emits `33`.

### 5. `combineLatest` to combine the Latest Value of each stream ⛙

The `combineLatest` operator combines the latest values from multiple Observables into a single Observable. It waits for all input Observables to emit at least one value, then emits an array containing the latest value from each.

**When to Use?**

Use `combineLatest` when you need to combine the most recent values from multiple Observables, and you want an update whenever any of the source Observables emits a new value.

Let’s understand `combineLatest` with the same example above:

CODE:

```jsx
import { combineLatest, concat, of } from "rxjs";
import { delay, map } from "rxjs/operators";

// Two observables emitting numbers
// ObservableA: [1 (1st emit), 2 (3rd emit), 3 (4th emit)]
const observableA$ = concat(
  of(1).pipe(delay(0)), // Emit 1 immediately
  of(2).pipe(delay(200)), // Emit 2 after 0.2 seconds
  of(3).pipe(delay(300)), // Emit 3 after 0.3 second
);

// Observable2: [10 (2nd emit), 20 (5th emit), 30 (6th emit)]
const observableB$ = concat(
  of(10).pipe(delay(100)), // Emit 10 after 0.1 second
  of(20).pipe(delay(400)), // Emit 20 after 0.4 seconds
  of(30).pipe(delay(500)), // Emit 30 after 0.5 second
);

// Using combineLatest to combine values from both observables
combineLatest([observableA$, observableB$])
  .pipe(map(([a, b]) => a + b))
  .subscribe((result) => console.log("Combined sum:", result));
```

OUTPUT:

```jsx
	// Output:
Zipped sum: 11
Zipped sum: 22
Zipped sum: 33
```

### Emission Sequence:

Here’s the order in which the values are emitted:

- **Time 0ms**:
    - `observableA$` emits `1`.
    - `combineLatest` doesn't emit yet because it's waiting for `observableB$` to emit its first value.
- **Time 100ms**:
    - `observableB$` emits `10`.
    - Now that both observables have emitted at least once, `combineLatest` emits its first value: `1 + 10 = 11`.
- **Time 200ms**:
    - `observableA$` emits `2`.
    - `combineLatest` immediately emits a new value using the latest from each: `2 + 10 = 12`.
- **Time 500ms**:
    - `observableA$` emits `3` (300ms after its previous emission).
    - `combineLatest` emits: `3 + 10 = 13`.
    - Almost immediately after, `observableB$` emits `20` (400ms after its previous emission).
    - `combineLatest` emits again with the new latest values: `3 + 20 = 23`.
- **Time 1000ms**:
    - `observableB$` emits `30`.
    - `combineLatest` emits using the latest from each: `3 + 30 = 33`.

### 6. `forkJoin` to combine the last value of each stream 🍴

`forkJoin` waits for **all** provided Observables to complete, then emits a single array containing the **last emitted value** from each Observable. It is useful when you want to wait for multiple Observables to finish before processing their final results.

**When to Use?**

Use `forkJoin` when you need to act only after all input Observables have completed, and you're only interested in the **final** emitted values of each Observable. This is typically used for tasks like making multiple API requests and processing their responses once all requests are completed.

Let’s understand `forkJoin` with the same example as before:

CODE:

```jsx
import { forkJoin, concat, of } from "rxjs";
import { delay, map } from "rxjs/operators";

// Two observables emitting numbers
// ObservableA: [1 (1st emit), 2 (3rd emit), 3 (4th emit)]
const observableA$ = concat(
  of(1).pipe(delay(0)),    // Emit 1 immediately
  of(2).pipe(delay(200)),  // Emit 2 after 0.2 seconds
  of(3).pipe(delay(300))   // Emit 3 after 0.3 second
);

// ObservableB: [10 (2nd emit), 20 (5th emit), 30 (6th emit)]
const observableB$ = concat(
  of(10).pipe(delay(100)),  // Emit 10 after 0.1 second
  of(20).pipe(delay(400)),  // Emit 20 after 0.4 seconds
  of(30).pipe(delay(500))   // Emit 30 after 0.5 second
);

// Using forkJoin to combine the final values from both observables
forkJoin([observableA$, observableB$])
  .pipe(map(([a, b]) => a + b))
  .subscribe((result) => console.log("ForkJoin sum:", result));
}
```

OUTPUT:

```jsx
// Output:
ForkJoin sum: 33
```

### Emission Sequence:

Here’s the order in which the values are emitted:

1. **Time 0ms**:
    - `observableA$` emits `1`.
    - `forkJoin` doesn't emit yet because it's waiting for both observables to complete.
2. **Time 100ms**:
    - `observableB$` emits `10`.
    - `forkJoin` still doesn't emit.
3. **Time 200ms**:
    - `observableA$` emits `2`.
    - `forkJoin` still doesn't emit.
4. **Time 500ms**:
    - `observableA$` emits `3` (300ms after its previous emission) and completes.
    - `observableB$` emits `20` (400ms after its previous emission).
    - `forkJoin` still doesn't emit because `observableB$` hasn't been completed.
5. **Time 1000ms**:
    - `observableB$` emits `30` and completes.
    - Now that both observables have been completed, `forkJoin` emits the combination of the last values from each observable: `3 + 30 = 33`.

### 7. `switchMap` to  switch to a New Observable 🔀

The `switchMap` operator maps each value to an Observable, then flattens all of these inner Observables, emitting values from the most recently mapped Observable.

### When to use?

Use `switchMap` when you want to create a new Observable based on the value emitted by the source Observable, but you only care about the emissions from the most recent inner Observable.

CODE:

```jsx
import { interval, of } from "rxjs";
import { delay, switchMap, take } from "rxjs/operators";

function calculateFactorial(n) {
  if (n <= 1) {
    return 1;
  }
  return n * calculateFactorial(n - 1);
}

export function milestoneSwichMap() {
  const source$ = interval(1000).pipe(
    take(5), // This will make the interval stop after 5 emissions
    switchMap((count) => {
      const n = count + 1; // Emit values 1, 2, 3, 4, 5
      console.log(`Calculating factorial of ${n}`);
      return of(calculateFactorial(n)).pipe(delay(500)); // Simulating a delay
    }),
  );

  source$.subscribe(
    (result) => console.log(`Factorial result: ${result}`),
  );
}
```

OUTPUT:

```jsx
// Output
Calculating factorial of 1
Factorial result: 1
Calculating factorial of 2
Factorial result: 2
Calculating factorial of 3
Factorial result: 6
Calculating factorial of 4
Factorial result: 24
Calculating factorial of 5
Factorial result: 120

```

Why use `switchMap` here?

1. Handling new emissions: `switchMap` is ideal when you want to switch to a new inner observable every time the source observable emits, canceling any ongoing operations from previous emissions.
2. Preventing overlap: In this case, if a new interval emission occurs before the previous factorial calculation is complete, `switchMap` will cancel the previous calculation and start a new one. This prevents overlapping calculations and ensures we're always working with the most recent value.
3. Resource management: If the factorial calculations were more resource-intensive or represented cancelable operations (like HTTP requests), `switchMap` would help manage these resources efficiently by canceling obsolete operations.

### Emission Sequence:

- **Time 0ms**:
    - The interval starts.
- **Time 1000ms**:
    - Interval emits 0.
    - `switchMap` starts calculating factorial(1).
- **Time 1500ms**:
    - Factorial(1) calculation completes and emits 1.
- **Time 2000ms**:
    - Interval emits 1.
    - Previous calculation (if still ongoing) would be canceled.
    - `switchMap` starts calculating factorial(2).
- **Time 2500ms**:
    - Factorial(2) calculation completes and emits 2.
- **Time 3000ms**:
    - Interval emits 2.
    - `switchMap` starts calculating factorial(3).
- **Time 3500ms**:
    - Factorial(3) calculation completes and emits 6.
- **Time 4000ms**:
    - Interval emits 3.
    - `switchMap` starts calculating factorial(4).
- **Time 4500ms**:
    - Factorial(4) calculation completes and emits 24.
- **Time 5000ms**:
    - Interval emits 4 (last emission due to `take(5)`).
    - `switchMap` starts calculating factorial(5).
- **Time 5500ms**:
    - Factorial(5) calculation completes and emits 120.
    - The observable completes as there are no more emissions from the source interval.

### 8. `concatMap` for Mapping and Concatenating in Order 📏

The `concatMap` operator maps each value to an Observable, then flattens all of these inner Observables in order, waiting for each one to complete before moving to the next.

### When to use?

Use `concatMap` when you need to perform operations in sequence, ensuring that each operation completes before the next one starts.

Let's create an example where we use `concatMap` to perform sequential calculations:

CODE:

```jsx
import { of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

const source$ = of(1, 2, 3);

source$
  .pipe(
    concatMap((n) => {
      console.log(`Starting calculation for ${n}`);
      return of(`Result: ${n * 2}`).pipe(delay(2000));
    }),
  )
  .subscribe((result) => console.log(result))
}
```

```jsx
// Output
Starting calculation for 1
(2 seconds later)
Result: 2
Starting calculation for 2
(2 seconds later)
Result: 4
Starting calculation for 3
(2 seconds later)
Result: 6
```

### `switchMap` vs `concatMap`

Both `concatMap` and `switchMap` are operators in RxJS that help transform and flatten Observables, but they have different use cases based on how they handle emissions from the source Observable. Here's a breakdown of when to use each operator:

### `switchMap`

**Definition**: `switchMap` maps each value from the source Observable to a new inner Observable. If a new value arrives from the source Observable while the previous inner Observable is still emitting, `switchMap` will unsubscribe from the previous inner Observable and subscribe to the new one.

**When to Use**:

1. **Latest Value Only**: Use `switchMap` when you are only interested in the most recent value emitted by the inner Observable.
2. **Cancel Previous Requests**: This operator is ideal for scenarios like user input (e.g., search boxes) where the user may type quickly and you want to cancel the previous request and only respond to the latest input.

### `concatMap`

**Definition**: `concatMap` also maps each value from the source Observable to a new inner Observable. However, it queues the inner Observables, subscribing to each one sequentially. It waits for each inner Observable to complete before moving on to the next one.

**When to Use**:

1. **Maintain Order**: Use `concatMap` when the order of emissions is important, and you want to ensure that each inner Observable completes before the next one starts.
2. **Sequential Processing**: This operator is suitable for scenarios where you need to perform actions in a sequence, such as chaining API calls where each call depends on the result of the previous one.
3. **Avoid Overlapping**: Use it in cases where you want to prevent overlapping emissions and ensure that each operation completes before starting the next.
