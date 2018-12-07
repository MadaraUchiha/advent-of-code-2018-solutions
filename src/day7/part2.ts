import { day7Input } from './input';
import { processInput } from './utils';

export function day7Part2(input: string) {
  const dag = processInput(input);
  let result = 0;
  const workers = 5;

  while (dag.size > 0) {
    result++;
    const values = Array.from(dag.values());

    const canWorkSteps = values
      .filter(x => x.dependees.size === 0)
      .sort((x, y) => x.value.charCodeAt(0) - y.value.charCodeAt(0));
    const stepsBeingWorkedOn = canWorkSteps.slice(0, workers);

    stepsBeingWorkedOn.forEach(item => item.workRemaining--);

    const stepsDoneOnThisPass = canWorkSteps.filter(step => step.workRemaining === 0);
    for (const completedNode of stepsDoneOnThisPass) {
      dag.delete(completedNode.value);
      for (const node of completedNode.dependants) {
        dag.get(node.value)!.dependees.delete(completedNode);
      }
    }
  }
  return result;
}

console.log(day7Part2(day7Input));
