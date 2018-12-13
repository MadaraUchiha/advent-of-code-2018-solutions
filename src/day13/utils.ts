export function processInput(input: string) {
  const carts: ICart[] = [];
  const field = input.split('\n').map(row => row.split(''));

  for (const [y, row] of field.entries()) {
    for (const [x, cell] of row.entries()) {
      if (isCart(cell)) {
        row[x] = cell === 'v' || cell === '^' ? '|' : '-';
        carts.push({
          direction: toDirection(cell),
          disqualified: false,
          nextTurn: Turn.Left,
          position: { x, y },
        });
      }
    }
  }

  return { field, carts };
}

export enum BehaviorOnCrash {
  Explode,
  Annihilate,
}

export function run(
  field: string[][],
  carts: ICart[],
  crashBehavior?: BehaviorOnCrash,
) {
  let generation = 0;
  while (true) {
    generation++;

    const nonDisqualified = carts.filter(({ disqualified }) => !disqualified);
    if (nonDisqualified.length === 1) {
      return nonDisqualified[0].position;
    }

    nonDisqualified.sort((cart1, cart2) => {
      const rowCompare = cart1.position.y - cart2.position.y;
      if (rowCompare !== 0) { return rowCompare; }
      return cart1.position.x - cart2.position.x;
    });

    for (const cart of nonDisqualified) {
      // In the case that we've disqualified a future cart, this will ensure we don't hit it.
      if (cart.disqualified) { continue; }

      const { x, y } = cart.position;

      // Collision check + cleanup
      for (const otherCart of nonDisqualified) {
        if (
          cart !== otherCart &&
          otherCart.position.x === x &&
          otherCart.position.y === y
        ) {
          if (crashBehavior === BehaviorOnCrash.Explode) {
            return { x, y };
          }
          if (crashBehavior === BehaviorOnCrash.Annihilate) {
            cart.disqualified = true;
            otherCart.disqualified = true;

            console.log('CRASHED:', x, y, 'on generation', generation);
            continue;
          }
        }
      }

      const tile = field[y][x];

      if (tile === '|') {
        if (cart.direction !== Direction.Up && cart.direction !== Direction.Down) {
          throw new Error(`Invalid position ${x},${y} ${cart.direction} ${tile}`);
        }
      }
      if (tile === '-') {
        if (cart.direction !== Direction.Left && cart.direction !== Direction.Right) {
          throw new Error(`Invalid position ${x},${y} ${cart.direction} ${tile}`);
        }
      }
      if (tile === '/') {
        if (cart.direction === Direction.Up || cart.direction === Direction.Down) {
          cart.direction += Turn.Right;
        } else {
          cart.direction += Turn.Left;
        }
      }
      if (tile === '\\') {
        if (cart.direction === Direction.Up || cart.direction === Direction.Down) {
          cart.direction += Turn.Left;
        } else {
          cart.direction += Turn.Right;
        }
      }
      if (tile === '+') {
        cart.direction += cart.nextTurn;
        if (cart.nextTurn === Turn.Left) {
          cart.nextTurn = Turn.Straight;
        } else if (cart.nextTurn === Turn.Straight) {
          cart.nextTurn = Turn.Right;
        } else {
          cart.nextTurn = Turn.Left;
        }
      }

      if (cart.direction < 0) { cart.direction += 4; }
      if (cart.direction > 3) { cart.direction -= 4; }

      const vector = getMoveVector(cart.direction);

      cart.position.y += vector.y;
      cart.position.x += vector.x;
    }
  }
}

export function isCart(cell: string): cell is CartSign {
  return cell === '>' || cell === '<' || cell === 'v' || cell === '^';
}

export function getMoveVector(direction: Direction) {
  switch (direction) {
    case Direction.Up: return { x: 0, y: -1 };
    case Direction.Right: return { x: 1, y: 0 };
    case Direction.Down: return { x: 0, y: 1 };
    case Direction.Left: return { x: -1, y: 0 };
  }
}

export function toDirection(cart: CartSign) {
  switch (cart) {
    case '^': return Direction.Up;
    case '>': return Direction.Right;
    case 'v': return Direction.Down;
    case '<': return Direction.Left;
  }
}

enum Direction {
  Up,
  Right,
  Down,
  Left,
}

enum Turn {
  Left = -1,
  Straight = 0,
  Right = 1,
}

export interface ICart {
  direction: Direction;
  nextTurn: Turn;
  position: { x: number; y: number };
  disqualified: boolean;
}

export type CartSign = '>' | '<' | 'v' | '^';
