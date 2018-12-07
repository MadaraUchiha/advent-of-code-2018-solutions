export function processInput(input: string) {
  const lines = input.split('\n');
  const flatDAG = new Map<string, DAGNode>();
  for (const line of lines) {
    const match = line.match(/Step ([A-Z]) must be finished before step ([A-Z]) can begin./);
    if (!match) {
      throw new Error('Regex didn\'t match for ' + line);
    }
    const [, dependee, dependant] = match;
    if (!flatDAG.has(dependee)) {
      flatDAG.set(dependee, new DAGNode(dependee));
    }
    if (!flatDAG.has(dependant)) {
      flatDAG.set(dependant, new DAGNode(dependant));
    }
    flatDAG.get(dependee)!.dependants.add(flatDAG.get(dependant)!);
    flatDAG.get(dependant)!.dependees.add(flatDAG.get(dependee)!);
  }
  return flatDAG;
}

export class DAGNode {
  public dependants: Set<DAGNode> = new Set();
  public dependees: Set<DAGNode> = new Set();
  public workRemaining: number;

  public constructor(
    public value: string,
  ) {
    this.workRemaining = 60 + value.charCodeAt(0) - 64;
  }
}
