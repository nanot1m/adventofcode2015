// @ts-check

import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(t.int()).parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  const target = 150;

  /**
   * @param {number[]} vals
   * @param {number} acc
   * @returns {number}
   */
  function recur(vals, acc) {
    if (acc === target) return 1;
    if (acc > target) return 0;
    if (vals.length === 0) return 0;

    const [head, ...tail] = vals;
    return recur(tail, acc + head) + recur(tail, acc);
  }

  return recur(input, 0);
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const target = 150;

  const map = new Map();

  /**
   * @param {number[]} vals
   * @param {number} acc
   * @param {number} used
   * @returns {number}
   */
  function recur(vals, acc, used) {
    if (acc === target) {
      map.set(used, (map.get(used) || 0) + 1);
      return;
    }
    if (acc > target) return;
    if (vals.length === 0) return;

    const [head, ...tail] = vals;
    recur(tail, acc + head, used + 1);
    recur(tail, acc, used);
  }

  recur(input, 0, 0);

  return map.get(map.keys().min());
}
