// @ts-check

import { Lib } from "../modules/index.js";
import { iterate } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.str().parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  return input
    .split("")
    .map((x) => (x === "(" ? 1 : -1))
    .reduce(Lib.add, 0);
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return iterate(0, (acc, idx) => (input[idx] === "(" ? acc + 1 : acc - 1))
    .takeWhile((acc) => acc >= 0)
    .count();
}
