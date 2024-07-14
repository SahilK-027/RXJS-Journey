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
    if(avgAge < 18){
      throw `All active users are too young`
    }
    else{
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
