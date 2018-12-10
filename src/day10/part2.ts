import { day10Input } from './input';
import { hasConsequtive, parseInput } from './utils';

export function day10Part2(input: string) {
  const points = parseInput(input);
  let t = 0;
  while (!hasConsequtive(points, 5)) {
    for (const point of points) {
      point.x += point.vx;
      point.y += point.vy;
    }
    t++;
  }
  return t;
}

console.log(day10Part2(day10Input));
