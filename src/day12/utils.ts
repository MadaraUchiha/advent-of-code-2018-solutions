export function processInput(input: string) {
  const lines = input.split('\n');
  const firstLine = lines.shift()!;
  const [, initialState] = firstLine.split('initial state: ');

  const instructions = new Map(
    lines
      .filter(Boolean)
      .map(instruction => instruction.split(' => ') as [string, Sign]),
  );

  return { initialState, instructions };
}

export type Sign = '.' | '#';

export class PotList {
  public pots: Pot[];
  public offset = 0;

  public constructor(initialState: string) {
    this.pots = initialState.split('').map(sign => new Pot(sign as Sign));
  }

  public getSign(offset: number) {
    const pot = this.pots[offset + this.offset];
    if (!pot) { return '.'; }
    return pot.sign;
  }

  public getPattern(offset: number) {
    return (
      this.getSign(offset - 2) +
      this.getSign(offset - 1) +
      this.getSign(offset + 0) +
      this.getSign(offset + 1) +
      this.getSign(offset + 2)
    );
  }

  public setSign(offset: number, sign: Sign) {
    const actualOffset = offset + this.offset;
    if (actualOffset >= 0 && actualOffset < this.pots.length) {
      return this.pots[actualOffset].sign = sign;
    }
    if (sign !== '#') {
      return; // If we're out of bounds, and we're trying to set ., ignore.
      // Out of bounds is implicitly .
    }
    if (actualOffset < 0) {
      // Trying to add nonexistent to the negatives
      const emptyPots = Math.abs(actualOffset) - 1;
      for (let i = 0; i < emptyPots; i++) {
        this.pots.unshift(new Pot('.'));
      }
      this.pots.unshift(new Pot(sign));
      this.offset += Math.abs(offset);
    } else if (actualOffset >= this.pots.length) {
      // Trying to add nonexistent to the poisitves
      const emptyPots = this.offset - offset - 1;
      for (let i = 0; i < emptyPots; i++) {
        this.pots.push(new Pot('.'));
      }
      this.pots.push(new Pot(sign));
    }
  }

  public get state() {
    return this.pots.map(pot => pot.sign).join('').replace(/\.+$/, '');
  }
}

export function computeGeneration(initialState: string, generations: number, instructions: Map<string, Sign>) {
  let potList = new PotList(initialState);

  for (let g = 0; g < generations; g++) {
    const newPotlist = new PotList(potList.state);
    const minimalOffset = -potList.offset - 2;
    const maximalOffset = potList.pots.length - potList.offset + 2;

    for (let i = minimalOffset; i < maximalOffset; i++) {
      const nextSign = instructions.get(potList.getPattern(i));
      if (!nextSign) { throw new Error(`This does not compute. ${potList.getPattern(i)}`); }
      newPotlist.setSign(i, nextSign);
    }
    potList = newPotlist;
  }

  return potList;
}

export function interestingPart(state: string) {
  return state.replace(/^\.+|\.+$/, '');
}

class Pot {
  public constructor(
    public sign: '.' | '#' = '.',
  ) { }
}
