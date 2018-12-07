import { day7Input } from './input';
import { processInput } from './utils';

export function day7Part1(input: string) {
  const dag = processInput(input);
  const result = [];
  while (dag.size > 0) {
    const values = Array.from(dag.values());

    const available = values
      .filter(x => x.dependees.size === 0)
      .sort((x, y) => x.value.charCodeAt(0) - y.value.charCodeAt(0));
    const current = available[0];

    result.push(current.value);

    for (const dependant of current.dependants) {
      dag.get(dependant.value)!.dependees.delete(dag.get(current.value)!);
    }
    dag.delete(current.value);
  }
  return result.join('');
}

console.log(day7Part1(day7Input));
