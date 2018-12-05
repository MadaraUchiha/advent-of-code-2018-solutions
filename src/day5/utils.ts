export function collapsedLength(input: string) {
  let result = '';
  for (const unit of input) {
    result += unit;
    result = removeMatches(result);
  }
  return result.length;
}

function removeMatches(input: string): string {
  if (input.length < 2) {
    return input;
  }
  const lastLetter = input[input.length - 1];
  const secondToLastLetter = input[input.length - 2];

  if (lastLetter !== secondToLastLetter && lastLetter.toLowerCase() === secondToLastLetter.toLowerCase()) {
    return removeMatches(input.slice(0, input.length - 2));
  }

  return input;
}
