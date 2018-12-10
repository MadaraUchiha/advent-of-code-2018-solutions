import { day8Input } from './input';
import { consumeStack, TreeNode } from './utils';

export function day8Part2(input: string) {
  const inputStack = input.split(' ').map(Number);
  const tree = consumeStack(inputStack);
  const value = computeValue(tree);

  return value;
}

function computeValue(tree: TreeNode) {
  if (tree.children.length === 0) {
    return tree.metadata.reduce((a, b) => a + b, 0);
  }

  let childrenSum = 0;
  for (const metadatum of tree.metadata) {
    const node: TreeNode | undefined = tree.children[metadatum - 1];
    if (node) {
      childrenSum += computeValue(node);
    }
  }

  return childrenSum;
}

console.log(day8Part2(day8Input));
