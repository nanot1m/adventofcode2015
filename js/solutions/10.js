// @ts-check

import { iterate } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.str().parse;

/**
 * @param {string} sequence
 */
function lookAndSay(sequence) {
  let result = "";
  let i = 0;

  while (i < sequence.length) {
    let count = 1;
    while (i + 1 < sequence.length && sequence[i] === sequence[i + 1]) {
      i++;
      count++;
    }
    result += count + sequence[i];
    i++;
  }

  return result;
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return iterate(input, lookAndSay).skip(40).first().length;
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return iterate(input, lookAndSay).skip(50).first().length;
}
