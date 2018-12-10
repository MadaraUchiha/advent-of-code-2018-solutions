export function generateRectArray<T>(w: number, h: number, getter: () => T) {
  return Array.from(Array(h)).map(_ => Array.from(Array(w)).map(getter));
}

export function findDistance(current: { x: number, y: number }, target: { x: number, y: number }) {
  return Math.abs(target.x - current.x) + Math.abs(target.y - current.y);
}

export function processInput(input: string) {
  return input.split('\n').map((coords, i) => {
    const [x, y] = coords.split(',').map(Number);
    return { x, y, id: String.fromCharCode(i + 65) };
  });
}

export function generateField(processedInput: Array<{ x: number, y: number, id: string }>) {
  const minimalX = Math.min(...processedInput.map(({ x }) => x));
  const minimalY = Math.min(...processedInput.map(({ y }) => y));
  const maximalX = Math.max(...processedInput.map(({ x }) => x));
  const maximalY = Math.max(...processedInput.map(({ y }) => y));

  const zeroCoords = { x: minimalX - 1, y: minimalY - 1 };
  const field = generateRectArray<number | string>(
    maximalX - minimalX + 2,
    maximalY - minimalY + 2,
    () => '.',
  );
  for (const { x, y, id } of processedInput) {
    // Our coordinate system starts from zeroCoords, not 0,0.
    const translatedX = x - zeroCoords.x;
    const translatedY = y - zeroCoords.y;

    field[translatedY][translatedX] = id;
  }
  return {
    field,
    zeroCoords,
  };
}
