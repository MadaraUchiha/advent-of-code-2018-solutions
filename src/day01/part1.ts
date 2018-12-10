import { day1Input } from './input';

export function day1Part1(input: string) {
  return input.split('\n').map(Number).reduce((a, b) => a + b);
}

console.log(day1Part1(day1Input));
