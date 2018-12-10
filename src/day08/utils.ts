export function consumeStack(stack: number[]) {
  const numberOfChildren = stack.shift()!;
  const numberOfMetadata = stack.shift()!;

  const node = new TreeNode();

  for (let i = 0; i < numberOfChildren; i++) {
    node.children.push(consumeStack(stack));
  }

  for (let i = 0; i < numberOfMetadata; i++) {
    node.metadata.push(stack.shift()!);
  }

  return node;
}

export class TreeNode {
  public metadata: number[] = [];
  public children: TreeNode[] = [];
}
