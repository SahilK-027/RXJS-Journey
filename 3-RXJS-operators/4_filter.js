import { of } from "rxjs";
import { filter } from "rxjs/operators";

export function milestoneFilter() {
  // Observable emitting numbers
  const numbers$ = of(1, 2, 3, 4, 5, 6);

  // Using filter to get even numbers
  const evenNumbers$ = numbers$.pipe(filter((num) => num % 2 === 0));

  evenNumbers$.subscribe((result) => console.log("Even:", result));
}
