import { day14Input } from './input';
import { generateRecipes } from './utils';

export function day14Part1(input: string) {
  const requiredRecipes = parseInt(input, 10) + 10;
  const result = generateRecipes(recipes => recipes.length < requiredRecipes);

  return result.slice(requiredRecipes - 10, requiredRecipes).join('');

}

console.log(day14Part1(day14Input));
