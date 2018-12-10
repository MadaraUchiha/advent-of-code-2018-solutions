import { day4Input } from './input';
import { findMostSleptMinute, processInput, sumHours } from './utils';

export function day4Part1(input: string) {
  const processedLog = processInput(input);

  const sleepiestGuard = Array.from(processedLog)
    .sort((guard1, guard2) => sumHours(guard2[1]) - sumHours(guard1[1]))[0];

  const [sleepiestId, sleepiestLog] = sleepiestGuard;
  return sleepiestId * findMostSleptMinute(sleepiestLog).mostCommonMinute;
}

console.log(day4Part1(day4Input));
