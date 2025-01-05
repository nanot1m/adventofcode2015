// @ts-check

import { iterate } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.str().parse;

/**
 * @param {string} str
 */
const rule1 = (str) => {
  for (let i = 0; i < str.length - 2; i++) {
    if (
      str.charCodeAt(i) + 1 === str.charCodeAt(i + 1) &&
      str.charCodeAt(i) + 2 === str.charCodeAt(i + 2)
    ) {
      return true;
    }
  }
  return false;
};

/**
 * @param {string} str
 */
const rule2 = (str) => !/[iol]/.test(str);

/**
 * @param {string} str
 */
const rule3 = (str) => {
  for (let i = 0; i < str.length - 2; i++)
    if (str[i] === str[i + 1])
      for (let j = i + 2; j < str.length - 1; j++)
        if (str[j] === str[j + 1]) return true;

  return false;
};

const increment = (/** @type {string} */ str) => {
  const arr = str.split("");
  for (let i = arr.length - 1; i >= 0; i--) {
    if (arr[i] === "z") {
      arr[i] = "a";
    } else {
      arr[i] = String.fromCharCode(arr[i].charCodeAt(0) + 1);
      break;
    }
  }
  return arr.join("");
};

/**
 * @param {InputType} input
 */
export function part1(input) {
  return iterate(input, increment)
    .filter((x) => rule1(x) && rule2(x) && rule3(x))
    .first();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return iterate(input, increment)
    .filter((x) => rule1(x) && rule2(x) && rule3(x))
    .skip(1)
    .first();
}
