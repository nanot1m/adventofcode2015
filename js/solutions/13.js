// @ts-check

import { Lib } from "../modules/index.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Alice would gain 54 happiness units by sitting next to Bob.
Alice would lose 79 happiness units by sitting next to Carol.
Alice would lose 2 happiness units by sitting next to David.
Bob would gain 83 happiness units by sitting next to Alice.
Bob would lose 7 happiness units by sitting next to Carol.
Bob would lose 63 happiness units by sitting next to David.
Carol would lose 62 happiness units by sitting next to Alice.
Carol would gain 60 happiness units by sitting next to Bob.
Carol would gain 55 happiness units by sitting next to David.
David would gain 46 happiness units by sitting next to Alice.
David would lose 7 happiness units by sitting next to Bob.
David would gain 41 happiness units by sitting next to Carol.`;

/** @typedef {ReturnType<typeof parseInput>} InputType */
const lineParser =
  t.tpl`${"source|str"} would ${"change|str"} ${"val|int"} happiness units by sitting next to ${"target|str"}.`.map(
    (x) => ({
      target: x.target,
      source: x.source,
      change: x.change === "gain" ? x.val : -x.val,
    })
  );
export const parseInput = t.arr(lineParser).parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  /** @type {Map<string, Map<string, number>>} */
  const map = new Map();

  for (const { source, target, change } of input) {
    if (!map.has(source)) map.set(source, new Map());
    map.get(source).set(target, change);
  }

  const people = [...map.keys()];

  return Lib.getPermutations(people)
    .map((path) =>
      path
        .concat(path[0])
        .values()
        .windowed(2)
        .map(([a, b]) => map.get(a).get(b) + map.get(b).get(a))
        .sum()
    )
    .max();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  /** @type {Map<string, Map<string, number>>} */
  const map = new Map();

  for (const { source, target, change } of input) {
    if (!map.has(source)) map.set(source, new Map());
    map.get(source).set(target, change);
  }

  const people = [...map.keys()];

  return Lib.getPermutations(people)
    .map((path) =>
      path
        .values()
        .windowed(2)
        .map(([a, b]) => map.get(a).get(b) + map.get(b).get(a))
        .sum()
    )
    .max();
}
