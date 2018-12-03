import { day2Input } from "./input";

export function day2Part2(input: string) {
  const processedInput = input.split('\n');

  for (const id1 of processedInput) {
    // Start from the next word from word1. I'm assuming that I won't reach the end, else I'm going to have a bad time.
    // I also checked in advance that the input is all unique entries. Else indexOf would give me unexpected results.
    for (const id2 of processedInput.slice(processedInput.indexOf(id1) + 1)) {
      let differingLetters = 0;
      for (let i = 0; i < id1.length; i++) {
        if (id1[i] !== id2[i]) {
          differingLetters++;
        }
      }
      if (differingLetters === 1) {
        return { id1, id2, answer: subtractDifferingLetters(id1, id2) };
      }
    }
  }
}

function subtractDifferingLetters(word1: string, word2: string) {
  let result = '';
  for (let i = 0; i < word1.length; i++) {
    if (word1[i] === word2[i]) {
      result += word1[i];
    }
  }
  return result;
}

console.log(day2Part2(day2Input));