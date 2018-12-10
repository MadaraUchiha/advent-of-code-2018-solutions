import { day5Input } from './input';
import { collapsedLength } from './utils';

export function day5Part1(input: string) {
  return collapsedLength(input);
}

console.log(day5Part1(day5Input));
