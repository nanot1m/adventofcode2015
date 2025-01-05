// @ts-check

import { range } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Sprinkles: capacity 5, durability -1, flavor 0, texture 0, calories 5
PeanutButter: capacity -1, durability 3, flavor 0, texture 0, calories 1
Frosting: capacity 0, durability -1, flavor 4, texture 0, calories 6
Sugar: capacity -1, durability 0, flavor 0, texture 2, calories 8`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

const lineParser = t.tpl`${"name|str"}: capacity ${"cap|int"}, durability ${"dur|int"}, flavor ${"flv|int"}, texture ${"txt|int"}, calories ${"cal|int"}`;

export const parseInput = t.arr(lineParser).parse;

const max = Math.max;

/**
 * @param {number} spoons
 * @param {number} depth
 * @returns {IteratorObject<number[]>}
 */
function* spoonCombinations(spoons, depth) {
  if (depth === 1) {
    yield [spoons];
    return;
  }
  for (const a of range(spoons)) {
    for (const rest of spoonCombinations(spoons - a, depth - 1)) {
      yield [a, ...rest];
    }
  }
}

/**
 * @param {InputType} input
 */
function getScore(input) {
  return (/** @type {number[]} */ comb) => {
    const cap = comb.reduce((acc, x, i) => acc + x * input[i].cap, 0);
    const dur = comb.reduce((acc, x, i) => acc + x * input[i].dur, 0);
    const flv = comb.reduce((acc, x, i) => acc + x * input[i].flv, 0);
    const txt = comb.reduce((acc, x, i) => acc + x * input[i].txt, 0);
    return max(0, cap) * max(0, dur) * max(0, flv) * max(0, txt);
  };
}

/**
 * @param {InputType} input
 * @param {number} calories
 */
function hasNCalories(input, calories) {
  return (/** @type {number[]} */ comb) =>
    comb.reduce((acc, x, i) => acc + x * input[i].cal, 0) === calories;
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return spoonCombinations(100, input.length).map(getScore(input)).max();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return spoonCombinations(100, input.length)
    .filter(hasNCalories(input, 500))
    .map(getScore(input))
    .max();
}
