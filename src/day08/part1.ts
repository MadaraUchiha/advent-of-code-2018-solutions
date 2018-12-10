import { day8Input } from './input';
import { consumeStack, TreeNode } from './utils';

export function day8Part1(input: string) {
  const inputStack = input.split(' ').map(Number);

  const tree = consumeStack(inputStack);

  return sumMetadata(tree);
}

function sumMetadata(tree: TreeNode): number {
  const ownSum = tree.metadata.reduce((a, b) => a + b, 0);
  return ownSum + tree.children.reduce((acc, child) => acc + sumMetadata(child), 0);
}

console.log(day8Part1(day8Input));
