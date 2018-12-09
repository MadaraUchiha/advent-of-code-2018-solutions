import { day9Input } from './input';
import { findWinner, processInput } from './utils';

export function day9Part1(input: string) {
  const { players, topMarble } = processInput(input);
  return findWinner({ players, topMarble });
}

console.log(day9Part1(day9Input));
