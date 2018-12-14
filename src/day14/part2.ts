import { day14Input } from './input';
import { generateRecipes } from './utils';

export function day14Part2(input: string) {
  // The -1 is because two recipes may be added in one generation. So it's possible to miss the pattern by one.
  const result = generateRecipes(recipes => !recipes.slice(-input.length - 1).join('').includes(input));

  // The position inside the slice + the size of the rest of the array.
  return result.slice(-input.length - 1).join('').indexOf(input) + (result.length - input.length - 1);

}

console.log(day14Part2(day14Input));
