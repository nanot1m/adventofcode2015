// @ts-check

import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

const parseLine = t.str().map((line) => {
  const [left, right] = line.split(", ");
  const [opL, opR] = left.split(" ");
  switch (opL) {
    case "hlf":
      return /** @type {const} */ ({ op: "hlf", reg: opR });
    case "tpl":
      return /** @type {const} */ ({ op: "tpl", reg: opR });
    case "inc":
      return /** @type {const} */ ({ op: "inc", reg: opR });
    case "jmp":
      return /** @type {const} */ ({ op: "jmp", offset: Number(opR) });
    case "jie":
      return /** @type {const} */ ({
        op: "jie",
        reg: opR,
        offset: Number(right),
      });
    case "jio":
      return /** @type {const} */ ({
        op: "jio",
        reg: opR,
        offset: Number(right),
      });
    default:
      throw new Error(`Invalid operation: ${opL}`);
  }
});

export const parseInput = t.arr(parseLine).parse;

/**
 * @typedef {Object} State
 * @property {Record<string, number>} regs
 * @property {number} pc
 */

/**
 *
 * @param {State} state
 * @param {InputType[number]} op
 */
function applyOp(state, op) {
  switch (op.op) {
    case "hlf":
      state.regs[op.reg] /= 2;
      state.pc++;
      break;
    case "tpl":
      state.regs[op.reg] *= 3;
      state.pc++;
      break;
    case "inc":
      state.regs[op.reg]++;
      state.pc++;
      break;
    case "jmp":
      state.pc += op.offset;
      break;
    case "jie":
      state.pc += state.regs[op.reg] % 2 === 0 ? op.offset : 1;
      break;
    case "jio":
      state.pc += state.regs[op.reg] === 1 ? op.offset : 1;
      break;
  }
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const state = { regs: { a: 0, b: 0 }, pc: 0 };
  while (state.pc < input.length) {
    applyOp(state, input[state.pc]);
  }
  return state.regs.b;
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const state = { regs: { a: 1, b: 0 }, pc: 0 };
  while (state.pc < input.length) {
    applyOp(state, input[state.pc]);
  }
  return state.regs.b;
}
