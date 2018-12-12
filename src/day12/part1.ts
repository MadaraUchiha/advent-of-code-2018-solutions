import { day12Input } from './input';
import { computeGeneration, processInput } from './utils';

export function day12Part1(input: string) {
  const { initialState, instructions } = processInput(input);

  const { state, offset } = computeGeneration(initialState, 20, instructions);

  return state.split('').reduce((res, sign, idx) => {
    if (sign === '.') { return res; }
    return res + (idx - offset);
  }, 0);

}

console.log(day12Part1(day12Input));
