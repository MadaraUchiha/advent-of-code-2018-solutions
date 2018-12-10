import { day3Input } from './input';
import { flattenOnce, processInput } from './utils';

export function day3Part2(input: string) {
  const processedInput = processInput(input);
  const field = Array.from(Array(1000)).map(_ => Array.from(Array(1000)).map(__ => [] as string[]));

  for (const claim of processedInput) {
    for (let row = claim.y; row < claim.y + claim.h; row++) {
      for (let col = claim.x; col < claim.x + claim.w; col++) {
        field[row][col].push(claim._id);
      }
    }
  }

  // Let's count, for each ID, in how many squares it appears alone.
  const countDict: { [id: string]: number } = {};
  for (const col of field) {
    for (const row of col) {
      // If there's more than one ID here, there's overlap, so not interesting. If 0, no claim, not interesting.
      if (row.length !== 1) { continue; }

      const [id] = row;
      countDict[id] = (countDict[id] || 0) + 1;
    }
  }

  // Only valid claim would be the one where there are as many singly painted squares, as there are painted squares.
  return processedInput.find(claim => countDict[claim._id] === claim.w * claim.h);
}

console.log(day3Part2(day3Input));
