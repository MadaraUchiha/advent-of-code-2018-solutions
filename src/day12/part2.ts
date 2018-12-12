import { day12Input } from './input';
import { computeGeneration, processInput } from './utils';

export function day12Part2(input: string) {
  const { initialState, instructions } = processInput(input);

  // Pattern repeats after 100 iterations for my input.
  const { state, offset } = computeGeneration(initialState, 100, instructions);

  // 50 billion generations - the 100 I computed + 51 pots that have flowers in the pattern.
  const fuckingVoodo = ((50e9 - 100) * 51);

  return state.split('').reduce((res, sign, idx) => {
    if (sign === '.') { return res; }
    return res + (idx - offset);
  }, 0) + fuckingVoodo;

}

console.log(day12Part2(day12Input));
