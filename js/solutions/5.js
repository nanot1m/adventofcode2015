// @ts-check

import { range } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
qjhvhtzxzqqjkmpb
xxyxx
uurcxstgmygtbstg
ieodomkazucvgmuy`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(t.str()).parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  const vowels = new Set("aeiou");

  const has3Vowels = (/** @type {string} */ str) =>
    str.split("").filter((x) => vowels.has(x)).length >= 3;

  const hasDoubleLetter = (/** @type {string} */ str) =>
    str
      .split("")
      .values()
      .windowed(2)
      .some(([a, b]) => a === b);

  const forbidden = new Set(["ab", "cd", "pq", "xy"]);

  const hasForbidden = (/** @type {string} */ str) =>
    str
      .split("")
      .values()
      .windowed(2)
      .some(([a, b]) => forbidden.has(a + b));

  return input
    .values()
    .filter((x) => has3Vowels(x) && hasDoubleLetter(x) && !hasForbidden(x))
    .count();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const hasPair = (/** @type {string} */ str) =>
    range(0, str.length - 2).some((i) =>
      str.slice(i + 2).includes(str.slice(i, i + 2))
    );

  const hasRepeat = (/** @type {string} */ str) =>
    str
      .split("")
      .values()
      .windowed(3)
      .some(([a, _, c]) => a === c);

  return input
    .values()
    .filter((x) => hasPair(x) && hasRepeat(x))
    .count();
}
