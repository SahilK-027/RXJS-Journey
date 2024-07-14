# RXJS-Journey
This repo is a collection of my learnings, experiments, and code snippets from the world of RxJS.

## What is RXJS?
RxJS (Reactive Extensions for JavaScript) is a library for composing asynchronous and event-based programs. It is a powerful tool for managing data streams and handling asynchronous operations in a declarative way. RxJS is often used in Angular to handle asynchronous events and data streams, making it easier to work with HTTP requests, WebSockets, user input events, and more, but it is not only limited to be used only in AngularJS alone. RxJS can be used in any JavaScript environment, including Node.js and other front-end frameworks like React and Vue.js or even in normal vanillaJS + HTML projects.

## Installation
You can checkout the installation process [here](https://rxjs.dev/guide/installation).

But one thing to note is that when we are using `RXJS in angular project` we don't need to install it separately.

## RXJS + Vanilla JS
Before starting our `RXJS in angular` journey we will first keep it framework agnostic. We will first work in Vanilla JS.

1. Create and Navigate to the Project Directory:

```bash
npm create vite@latest
Need to install the following packages:
  create-vite@5.3.0
Ok to proceed? (y) y
✔ Project name: …  1-RXJS-basics
✔ Package name: … 1-rxjs-basics
? Select a framework: › - Use arrow-keys. Return to submit.
✔ Select a framework: › Vanilla
✔ Select a variant: › TypeScript

Done.
```

2. Install Necessary Dependencies:

```bash
cd 1-RXJS-basics
npm install rxjs 
npm run dev
```

## RXJS is ready to rock!
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
