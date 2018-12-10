import { day1Input } from './input';

export function day1Part2(input: string) {
  const processedInput = input.split('\n').map(Number);
  const frequencyHistory = [0]; // Riddle makes it clear that 0 is the initial value.
  let currentFrequency = 0;

  // Just so that we don't have an infinite loop. Should be completed in less than 1000 iterations.
  const hardLimit = 1000;

  for (let lim = 0; lim < hardLimit; lim++) {
    for (const frequencyChange of processedInput) {
      currentFrequency += frequencyChange;

      if (frequencyHistory.includes(currentFrequency)) {
        return currentFrequency;
      }

      frequencyHistory.push(currentFrequency);
    }
  }

  return NaN; // Couldn't find a result after hardLimit iterations.
}

console.log(day1Part2(day1Input));
