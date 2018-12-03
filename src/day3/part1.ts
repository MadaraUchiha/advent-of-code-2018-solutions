import { day3Input } from "./input";
import { processInput, flattenOnce } from "./utils";

export function day3Part1(input: string) {
  const processedInput = processInput(input);
  const field = Array.from(Array(1000)).map(_ => Array.from(Array(1000)).map(_ => 0));

  for (const claim of processedInput) {
    for (let col = claim.y; col < claim.y + claim.h; col++) {
      for (let row = claim.x; row < claim.x + claim.w; row++) {
        field[col][row]++;
      }
    }
  }

  const flattenedField = flattenOnce(field);

  return flattenedField.filter(item => item >= 2).length;
}

console.log(day3Part1(day3Input));