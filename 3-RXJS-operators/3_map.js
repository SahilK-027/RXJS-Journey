import { of } from "rxjs";
import { map } from "rxjs/operators";

export function milestoneMap() {
  // Observable emitting numbers
  const numbers$ = of(1, 2, 3, 4, 5);

  // Using map to square each number
  const squares$ = numbers$.pipe(map((num) => num * num));

  squares$.subscribe((result) => console.log("Squared:", result));
}
