import { day5Input } from "./input";
import { collapsedLength } from "./utils";

export function day5Part2(input: string) {
  const letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  return letters
    .map(letter => input.replace(new RegExp(letter, 'gi'), ''))
    .map(collapsedLength)
    .sort((a, b) => a - b)[0];
}

console.log(day5Part2(day5Input));