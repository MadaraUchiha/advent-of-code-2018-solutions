import { day13Input } from './input';
import { BehaviorOnCrash, processInput, run } from './utils';

export function day13Part2(input: string) {
  const { field, carts } = processInput(input);
  return run(field, carts, BehaviorOnCrash.Annihilate);
}

console.log(day13Part2(day13Input));
