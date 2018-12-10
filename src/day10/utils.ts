/**
 * The heuristic here being that it's unlikely that the message would be completed unless
 * at least `y` points are aligned.
 */
export function hasConsecutive(points: Array<{ x: number; y: number }>, y: number) {
  points.sort(({ y: yA }, { y: yB }) => yA - yB);
  return points.some(point => {
    for (let i = 1; i <= y; i++) {
      if (!points.some(point2 => point.y + i === point2.y && point.x === point2.x)) {
        return false;
      }
    }
    return true;
  });
}

export function parseInput(input: string) {
  const lines = input.split('\n');

  return lines.map(line => {
    const match = line.match(/position=<\s*([-\d]+)\s*,\s*([-\d]+)\s*> velocity=<\s*([-\d]+),\s*([-\d]+)>/);
    if (!match) { throw new Error(`No match for ${line}`); }

    const [, x0, y0, vx, vy] = match.map(Number);
    return { x0, y0, vx, vy, x: x0, y: y0 };
  });
}
