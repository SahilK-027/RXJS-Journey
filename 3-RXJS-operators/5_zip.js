import { concat, of, zip } from "rxjs";
import { delay, map } from "rxjs/operators";

export function milestoneZip() {
  // Two observables emitting numbers
  // Observable1: [1 (1st emit), 2 (3rd emit), 3 (4th emit)]
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
}
