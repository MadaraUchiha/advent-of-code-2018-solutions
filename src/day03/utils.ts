export function processInput(input: string) {
  return input.split('\n').map(line => {
    const [id, claim] = line.split(' @ ');
    const [coords, dimensions] = claim.split(': ');
    const [x, y] = coords.split(',').map(Number);
    const [w, h] = dimensions.split('x').map(Number);
    // the _id is undescored so that it appears first in the debugger.
    return { _id: id, x, y, w, h };
  });
}

export function flattenOnce<T>(arr: T[][]) {
  return arr.reduce((a, b) => a.concat(b));
}
