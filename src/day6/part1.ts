import { day6Input } from './input';
import { findDistance, generateField, processInput } from './utils';

export function day6Part1(input: string) {
  const processedInput = processInput(input);

  const { field, zeroCoords } = generateField(processedInput);

  for (let r = 0; r < field.length; r++) {
    const row = field[r];
    for (let c = 0; c < row.length; c++) {
      const points = [...processedInput];
      const pointDistance = findDistance.bind(null, { y: r + zeroCoords.y, x: c + zeroCoords.x });
      points.sort((pointA, pointB) => pointDistance(pointA) - pointDistance(pointB));

      if (pointDistance(points[0]) - pointDistance(points[1]) && row[c] === '.') {
        row[c] = points[0].id;
      }
    }
  }

  const eligiblePoints = processedInput
    .filter(point => {
      // disqualified if it's on the first or last row.
      if (field[0].includes(point.id)) { return false; }
      if (field[field.length - 1].includes(point.id)) { return false; }
      // disqualified if it's on the first or last column.
      return field.every(row => row[0] !== point.id && row[row.length - 1] !== point.id);
    })
    .map(({ id }) => id);

  const countDict: { [id: string]: number } = {};

  for (const row of field) {
    for (const cell of row) {
      if (eligiblePoints.includes(cell as string)) {
        countDict[cell] = countDict[cell] || 0;
        countDict[cell]++;
      }
    }
  }

  // return field.map(row => row.join('')).join('\n');
  return Object.entries(countDict).sort(([_, countA], [__, countB]) => countB - countA)[0];
}

console.log(day6Part1(day6Input));
