export type Register = [number, number, number, number];
export type OpCode = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15;
export interface Instruction {
  A: number;
  B: number;
  C: number;
  opCode: OpCode;
}

export interface ILogEntry {
  afterRegisters: Register;
  beforeRegisters: Register;
  instruction: Instruction;
}
export function processInput(day15Input: string) {
  const [logStr, programStr] = day15Input.split('\n\n\n\n');
  const entries = logStr.split('\n\n');

  const log = entries.map(entry => {
    const [before, op, after] = entry.split('\n');
    const [, beforeState] = before.split('Before: ');
    const [opCode, A, B, C] = op.split(' ').map(Number);
    const [, afterState] = after.split('After:  ');

    return {
      afterRegisters: JSON.parse(afterState) as Register,
      beforeRegisters: JSON.parse(beforeState) as Register,
      instruction: {
        A, B, C, opCode,
      } as Instruction,
    };
  });

  const program = programStr.split('\n').map(instruction => {
    const [opCode, A, B, C] = instruction.split(' ').map(Number);
    return { A, B, C, opCode };
  });

  return { log, program };
}

export function instructionMatches(
  entry: ILogEntry,
  instruction: (register: [number, number, number, number], a: number, b: number, c: number) => void,
) {
  const expectedAfter = runInstruction([...entry.beforeRegisters] as Register, instruction, entry.instruction);
  return JSON.stringify(expectedAfter) === JSON.stringify(entry.afterRegisters);
}

export function runInstruction(
  register: Register,
  instruction: (register: [number, number, number, number], a: number, b: number, c: number) => void,
  operands: { A: number, B: number, C: number },
) {
  const { A, B, C } = operands;
  instruction(register, A, B, C);

  return register;
}
