import { day4Input } from "./input";
import { processInput, findMostSleptMinute } from "./utils";

export function day4Part2(input: string) {
  const processedLog = processInput(input);

  const guardsMostSleptMinutes = Array.from(processedLog.entries())
    .map<[number, { mostCommonMinute: number; mostCommonCount: number; }]>(([id, log]) => [id, findMostSleptMinute(log)]);

  const [bestCandidateId, { mostCommonMinute }] = guardsMostSleptMinutes.sort(([_, mostSleptA], [__, mostSleptB]) => mostSleptB.mostCommonCount - mostSleptA.mostCommonCount)[0]

  return bestCandidateId * mostCommonMinute;
}

console.log(day4Part2(day4Input));