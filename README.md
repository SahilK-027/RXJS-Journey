# RXJS-Journey
This repo is a collection of my learnings, experiments, and code snippets from the world of RxJS.

## 🔹 What is RXJS?
RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs. It is a powerful tool for managing data streams and handling asynchronous operations in a declarative way. RxJS is often used in Angular to handle asynchronous events and data streams, making it easier to work with HTTP requests, WebSockets, user input events, and more, but it is not only limited to be used only in AngularJS alone. RxJS can be used in any JavaScript environment, including Node.js and other front-end frameworks like React and Vue.js or even in normal vanillaJS + HTML projects.

## 🔹 Installation
You can checkout the installation process [here](https://rxjs.dev/guide/installation).

But one thing to note is that when we are using `RXJS in angular project` we don't need to install it separately.

## 🔹 1-RXJS-basics
Before starting our `RXJS in angular` journey we will first keep it framework agnostic. We will first work in Vanilla JS.

1. Create and Navigate to the Project Directory:

```bash
mkdir 1-RXJS-basics
cd 1-RXJS-basics
npm init -y
touch index.js
```

2. Install Necessary Dependencies:

```bash
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