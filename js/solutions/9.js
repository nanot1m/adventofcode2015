// @ts-check

import { Lib } from "../modules/index.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
London to Dublin = 464
London to Belfast = 518
Dublin to Belfast = 141`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.arr(
  t.tpl`${"from|str"} to ${"to|str"} = ${"distance|int"}`
).parse;

/**
 * @param {InputType} input
 */
function createDistanceMap(input) {
  /** @type {Map<string, Map<string, number>>} */
  const map = new Map();
  for (const { from, to, distance } of input) {
    if (!map.has(from)) map.set(from, new Map());
    if (!map.has(to)) map.set(to, new Map());
    map.get(from).set(to, distance);
    map.get(to).set(from, distance);
  }
  return map;
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const map = createDistanceMap(input);

  return Lib.getPermutations([...map.keys()])
    .map((path) =>
      path
        .values()
        .windowed(2)
        .map(([a, b]) => map.get(a).get(b))
        .sum()
    )
    .min();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const map = createDistanceMap(input);

  return Lib.getPermutations([...map.keys()])
    .map((path) =>
      path
        .values()
        .windowed(2)
        .map(([a, b]) => map.get(a).get(b))
        .sum()
    )
    .max();
}
