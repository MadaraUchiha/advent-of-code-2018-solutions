import { day10Input } from './input';
import { hasConsecutive, parseInput } from './utils';

export function day10Part1(input: string) {
  const points = parseInput(input);
  while (!hasConsecutive(points, 5)) {
    for (const point of points) {
      point.x += point.vx;
      point.y += point.vy;
    }
  }
  return renderField(points);
}

export function renderField(points: Array<{ x: number; y: number }>) {
  const minX = Math.min(...points.map(({ x }) => x)) - 1;
  const minY = Math.min(...points.map(({ y }) => y)) - 1;
  const maxX = Math.max(...points.map(({ x }) => x)) + 1;
  const maxY = Math.max(...points.map(({ y }) => y)) + 1;

  const translateX = (x: number) => x - minX;
  const translateY = (y: number) => y - minY;

  const field = Array.from(Array(translateY(maxY + 1))).map(_ => Array.from(Array(translateX(maxX + 1))).fill('.'));

  for (const { x, y } of points) {
    field[translateY(y)][translateX(x)] = '#';
  }

  return field.map(row => row.join('')).join('\n');
}

console.log(day10Part1(day10Input));
