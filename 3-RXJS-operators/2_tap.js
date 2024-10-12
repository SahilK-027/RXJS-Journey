import { of } from "rxjs";
import { tap } from "rxjs/operators";

export function milestoneTap() {
  // Observable emitting numbers
  const numbers$ = of(1, 2, 3);

  // Using tap to log values before processing
  numbers$
    .pipe(
      tap((num) => console.log("Data to log:", num)), // Log the emitted data
    )
    .subscribe((result) => console.log("Emitted data:", result)); // Log the emitted result
}
