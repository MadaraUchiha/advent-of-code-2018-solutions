import { day13Input } from './input';
import { BehaviorOnCrash, processInput, run } from './utils';

export function day13Part1(input: string) {
  const { field, carts } = processInput(input);
  return run(field, carts, BehaviorOnCrash.Explode);
}

console.log(day13Part1(day13Input));
