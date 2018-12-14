export function generateRecipes(runWhile: (recipes: number[]) => boolean) {
  const recipes = [3, 7];

  let elf1CurrentIndex = 0;
  let elf2CurrentIndex = 1;

  let generations = 0;
  while (runWhile(recipes)) {
    generations++;
    const elf1Current = recipes[elf1CurrentIndex];
    const elf2Current = recipes[elf2CurrentIndex];

    const nextRecipe = elf1Current + elf2Current;

    recipes.push(...toDigits(nextRecipe));

    elf1CurrentIndex = (elf1CurrentIndex + elf1Current + 1) % recipes.length;
    elf2CurrentIndex = (elf2CurrentIndex + elf2Current + 1) % recipes.length;
  }
  return recipes;
}

export function toDigits(n: number) {
  return [...n.toString()].map(Number);
}
