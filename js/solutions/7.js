// @ts-check

import { getOrUpdate } from "../modules/lib.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
123 -> x
456 -> y
x AND y -> d
x OR y -> e
x LSHIFT 2 -> f
y RSHIFT 2 -> g
NOT x -> h
NOT y -> i`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(
  t.tuple([t.str().map(parseCmd), t.str()], " -> ")
).parse;

function parseCmd(/** @type {string} */ str) {
  const [x, y, z] = str.split(" ");
  if (z) return { op: y, left: x, right: z };
  if (y) return { op: x, right: y };
  return { left: x };
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const rs = new Map();
  const cache = new Map();

  const get = (/** @type {string} */ register) =>
    getOrUpdate(cache, register, () => {
      if (isNaN(Number(register))) {
        return rs.get(register)();
      }
      return Number(register);
    });

  for (const [cmd, register] of input) {
    rs.set(register, () => {
      if (!cmd.op) {
        return get(cmd.left);
      }
      if (cmd.op === "NOT") {
        return ~get(cmd.right) & 0xffff;
      }
      if (cmd.op === "AND") {
        return get(cmd.left) & get(cmd.right);
      }
      if (cmd.op === "OR") {
        return get(cmd.left) | get(cmd.right);
      }
      if (cmd.op === "LSHIFT") {
        return get(cmd.left) << Number(cmd.right);
      }
      if (cmd.op === "RSHIFT") {
        return get(cmd.left) >> Number(cmd.right);
      }
      throw new Error("Invalid command");
    });
  }
  return get("a");
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const rs = new Map();
  const cache = new Map();

  const get = (/** @type {string} */ register) =>
    getOrUpdate(cache, register, () => {
      if (isNaN(Number(register))) {
        return rs.get(register)();
      }
      return Number(register);
    });

  for (const [cmd, register] of input) {
    rs.set(register, () => {
      if (!cmd.op) {
        return get(cmd.left);
      }
      if (cmd.op === "NOT") {
        return ~get(cmd.right) & 0xffff;
      }
      if (cmd.op === "AND") {
        return get(cmd.left) & get(cmd.right);
      }
      if (cmd.op === "OR") {
        return get(cmd.left) | get(cmd.right);
      }
      if (cmd.op === "LSHIFT") {
        return get(cmd.left) << Number(cmd.right);
      }
      if (cmd.op === "RSHIFT") {
        return get(cmd.left) >> Number(cmd.right);
      }
      throw new Error("Invalid command");
    });
  }

  const tmp = get("a");
  cache.clear();
  rs.set("b", () => tmp);

  return get("a");
}

/**
d: 72
e: 507
f: 492
g: 114
h: 65412
i: 65079
x: 123
y: 456
 */
