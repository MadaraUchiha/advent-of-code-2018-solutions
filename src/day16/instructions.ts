// tslint:disable:no-bitwise
import { Register } from './utils';

export function addr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] + register[b];
}

export function addi(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] + b;
}

export function mulr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] * register[b];
}

export function muli(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] * b;
}

export function banr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] & register[b];
}

export function bani(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] & b;
}

export function borr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] | register[b];
}

export function bori(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] | b;
}

export function setr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a];
}

export function seti(register: Register, a: number, b: number, c: number) {
  register[c] = a;
}

export function gtir(register: Register, a: number, b: number, c: number) {
  register[c] = a > register[b] ? 1 : 0;
}

export function gtri(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] > b ? 1 : 0;
}

export function gtrr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] > register[b] ? 1 : 0;
}

export function eqir(register: Register, a: number, b: number, c: number) {
  register[c] = a === register[b] ? 1 : 0;
}

export function eqri(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] === b ? 1 : 0;
}

export function eqrr(register: Register, a: number, b: number, c: number) {
  register[c] = register[a] === register[b] ? 1 : 0;
}
