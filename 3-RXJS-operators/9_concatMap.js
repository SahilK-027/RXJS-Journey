import { of } from "rxjs";
import { concatMap, delay } from "rxjs/operators";

export function milestoneConcatMap() {
  const source$ = of(1, 2, 3);

  source$
    .pipe(
      concatMap((n) => {
        console.log(`Starting calculation for ${n}`);
        return of(`Result: ${n * 2}`).pipe(delay(2000));
      }),
    )
    .subscribe((result) => console.log(result));
}
