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