import { day16Input } from './input';
import * as instructions from './instructions';
import { instructionMatches, processInput, Register, runInstruction } from './utils';

export function day16Part2(input: string) {
  const { log: processorLog, program } = processInput(input);

  const possibleInstructions = Object.values(instructions);

  const disqualified: Array<Set<keyof typeof instructions>> =
    Array.from(Array(16)).map(() => new Set());

  const known = Array.from(Array(16)).fill(undefined);

  for (const entry of processorLog) {
    const disqualifiedForOpCode = disqualified[entry.instruction.opCode];
    for (const instruction of possibleInstructions) {
      const name = instruction.name as keyof typeof instructions;
      if (!instructionMatches(entry, instruction)) {
        if (!disqualifiedForOpCode.has(name)) {
          disqualifiedForOpCode.add(name);
        }
      }
    }
  }

  while (known.includes(undefined)) {
    for (const [index, set] of disqualified.entries()) {
      if (set.size === 15) {
        const remaining = possibleInstructions.find(reg => !set.has(reg.name as keyof typeof instructions))!;
        const name = remaining.name as keyof typeof instructions;
        if (known.includes(remaining)) { continue; }
        known[index] = remaining;
        for (let i = 0; i < 16; i++) {
          if (i === index) { continue; }
          disqualified[i].add(name);
        }
      }
    }
  }

  let register: Register = [0, 0, 0, 0];
  for (const { A, B, C, opCode } of program) {
    register = runInstruction(register, known[opCode], { A, B, C });
  }

  return register[0];
}

console.log(day16Part2(day16Input));
