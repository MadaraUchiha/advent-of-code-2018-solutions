import { day16Input } from './input';
import * as instructions from './instructions';
import { instructionMatches, processInput } from './utils';

export function day16Part1(input: string) {
  const { log } = processInput(input);

  const possibleRegisters = Object.values(instructions);

  return log.filter(entry => {
    const matching = possibleRegisters.filter(instruction => instructionMatches(entry, instruction));

    return matching.length >= 3;
  }).length;
}

console.log(day16Part1(day16Input));
