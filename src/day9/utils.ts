export function findWinner({ players, topMarble }: { players: number; topMarble: number; }) {
  const circle = new Circle(0);
  let currentPlayer = 1;
  const scores: { [key: number]: number } = {};

  for (let i = 1; i <= topMarble; i++) {
    if (i % 23 === 0) {
      scores[currentPlayer] = scores[currentPlayer] || 0;
      scores[currentPlayer] += i;
      circle.moveCounterClockwise(7);
      const removedValue = circle.pop();
      scores[currentPlayer] += removedValue;
    } else {
      circle.moveClockwise(1);
      circle.insert(i);
    }
    currentPlayer = (currentPlayer + 1) % players;
  }

  return Object.entries(scores).sort(([_, scoreA], [__, scoreB]) => scoreB - scoreA)[0];
}

export class Circle {
  public current: LinkedNode;
  public constructor(initialValue: number) {
    this.current = new LinkedNode(initialValue);
    this.current.next = this.current;
    this.current.prev = this.current;
  }

  public moveClockwise(n: number) {
    for (let i = 0; i < n; i++) {
      this.current = this.current.next;
    }
  }

  public moveCounterClockwise(n: number) {
    for (let i = 0; i < n; i++) {
      this.current = this.current.prev;
    }
  }

  public insert(value: number) {
    const newNode = new LinkedNode(value);
    newNode.prev = this.current;
    newNode.next = this.current.next;
    this.current.next.prev = newNode;
    this.current.next = newNode;
    this.current = newNode;
  }

  public pop() {
    const removing = this.current;
    removing.next.prev = removing.prev;
    removing.prev.next = removing.next;

    this.current = removing.next;

    return removing.value;
  }
}

class LinkedNode {
  // I don't care. I guarantee those will be set by the Circle.
  public next: LinkedNode = null as any;
  public prev: LinkedNode = null as any;

  public constructor(public value: number) { }
}

export function processInput(input: string) {
  const [, players, topMarble] = input.match(/(\d+) players; last marble is worth (\d+) points/)!;
  return { players: Number(players), topMarble: Number(topMarble) };
}
