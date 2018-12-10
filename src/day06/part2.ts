import { day6Input } from './input';
import { findDistance, generateField, processInput } from './utils';

export function day6Part2(input: string) {
  const processedInput = processInput(input);
  const { field, zeroCoords } = generateField(processedInput);

  let pointsWithDistanceUnder10000 = 0;

  for (let r = 0; r < field.length; r++) {
    const row = field[r];
    for (let c = 0; c < row.length; c++) {
      const pointDistance = findDistance.bind(null, { y: r + zeroCoords.y, x: c + zeroCoords.x });
      const sum = processedInput.map(target => pointDistance(target)).reduce((a, b) => a + b, 0);

      if (sum < 10000) {
        pointsWithDistanceUnder10000++;
      }
    }
  }

  return pointsWithDistanceUnder10000;
}

console.log(day6Part2(day6Input));
