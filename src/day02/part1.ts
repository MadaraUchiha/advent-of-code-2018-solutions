import { day2Input } from './input';

export function day2Part1(input: string) {
  const processedInput = input.split('\n');

  const withTwoOfAnyLetter = processedInput
    .filter(item => item.split('').some(letter => numberOfOccurences(item, letter) === 2)).length;
  const withThreeOfAnyLetter = processedInput
    .filter(item => item.split('').some(letter => numberOfOccurences(item, letter) === 3)).length;

  return withThreeOfAnyLetter * withTwoOfAnyLetter;
}

function numberOfOccurences(haystack: string, needle: string) {
  const matches = haystack.match(new RegExp(needle, 'g'));
  if (!matches) {
    return 0; // Should never reach.
  }
  return matches.length;
}

console.log(day2Part1(day2Input));
