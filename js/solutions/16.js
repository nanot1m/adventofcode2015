// @ts-check

import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Sue 1: goldfish: 6, trees: 9, akitas: 0
Sue 2: goldfish: 7, trees: 1, akitas: 0
Sue 3: cars: 10, akitas: 6, perfumes: 7
Sue 4: perfumes: 2, vizslas: 0, cars: 6
Sue 5: goldfish: 1, trees: 3, perfumes: 10
Sue 6: children: 9, vizslas: 7, cars: 9
Sue 7: cars: 6, vizslas: 5, cats: 3
Sue 8: akitas: 10, vizslas: 9, children: 3
Sue 9: vizslas: 8, cats: 2, trees: 1
Sue 10: perfumes: 10, trees: 6, cars: 4`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

const lineParser = t.tpl2`Sue ${t.named("id", t.int())}: ${t.named(
  "items",
  t
    .arr(t.tuple([t.str(), t.int()], ": "), ", ")
    .map((arr) => Object.fromEntries(arr))
)}`;

export const parseInput = t.arr(lineParser).parse;

/**
 * @param {Record<string, number>} a
 * @param {Record<string, number>} b
 */
function measureEquality(a, b) {
  let score = 0;
  for (const key in a) {
    if (b[key] !== undefined && a[key] === b[key]) {
      score++;
    }
  }
  return score;
}

const lookingFor = {
  children: 3,
  cats: 7,
  samoyeds: 2,
  pomeranians: 3,
  akitas: 0,
  vizslas: 0,
  goldfish: 5,
  trees: 3,
  cars: 2,
  perfumes: 1,
};

/**
 * @param {InputType} input
 */
export function part1(input) {
  const { id } = input
    .values()
    .maxBy((sue) => measureEquality(sue.items, lookingFor));
  return id;
}

const gtKeys = ["cats", "trees"];
const ltKeys = ["pomeranians", "goldfish"];

/**
 * @param {Record<string, number>} a
 * @param {Record<string, number>} b
 */
function measureEquality2(a, b) {
  let score = 0;
  for (const key in a) {
    if (b[key] === undefined) {
      continue;
    }
    if (gtKeys.includes(key)) {
      if (a[key] > b[key]) score++;
    } else if (ltKeys.includes(key)) {
      if (a[key] < b[key]) score++;
    } else if (a[key] === b[key]) {
      score++;
    }
  }
  return score;
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const { id } = input
    .values()
    .maxBy((sue) => measureEquality2(sue.items, lookingFor));
  return id;
}
