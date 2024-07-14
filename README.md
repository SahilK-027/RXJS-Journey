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