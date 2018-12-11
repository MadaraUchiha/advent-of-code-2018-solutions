import { day11Input } from './input';
import { generateField } from './utils';

export function day11Part2(input: number) {
  const field = generateField(input);
  let max = -Infinity;
  let coords = [NaN, NaN];

  for (let s = 1; s <= field.length; s++) {
    for (let y = 0; y < field.length - (s - 1); y++) {
      for (let x = 0; x < field.length - (s - 1); x++) {
        let sum = 0;
        for (let y1 = y; y1 < y + s; y1++) {
          for (let x1 = x; x1 < x + s; x1++) {
            sum += field[y1][x1];
          }
        }
        if (sum > max) {
          max = sum;
          coords = [x + 1, y + 1, s];
        }
      }
    }
  }

  return { coords, max };

}

console.log(day11Part2(day11Input));
