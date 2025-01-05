// @ts-check

import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
""
"abc"
"aaa\\"aaa"
"\\x27"`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(t.str()).parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  const parsed = input.values().map((line) => eval(line));
  return input.values().sum((x) => x.length) - parsed.sum((x) => x.length);
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const parsed = input.values().map((line) => JSON.stringify(line));
  return parsed.sum((x) => x.length) - input.values().sum((x) => x.length);
}
