import { day11Input } from './input';
import { generateField } from './utils';

export function day11Part1(input: number) {
  const field = generateField(input);
  let max = -Infinity;
  let coords = [NaN, NaN];

  for (let y = 0; y < field.length - 2; y++) {
    for (let x = 0; x < field.length - 2; x++) {
      const sum =
      + field[y    ][x    ]
      + field[y + 1][x    ]
      + field[y + 2][x    ]
      + field[y    ][x + 1]
      + field[y + 1][x + 1]
      + field[y + 2][x + 1]
      + field[y    ][x + 2]
      + field[y + 1][x + 2]
      + field[y + 2][x + 2];

      if (sum > max) {
        max = sum;
        coords = [x + 1, y + 1];
      }
    }
  }

  return {coords, max};

}

console.log(day11Part1(day11Input));
