// @ts-check

import { range } from "../modules/itertools.js";
import { t } from "../modules/parser.js";
import crypto from "node:crypto";

/**
 * @param {string} str
 * @returns {string}
 */
export function md5(str) {
  return crypto.createHash("md5").update(str).digest("hex");
}

export const useExample = false;

export const exampleInput = `\
pqrstuv`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.str().parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  return range(0, Infinity)
    .map((x) => md5(`${input}${x}`))
    .findIndex((x) => x.startsWith("00000"));
}

/**
 * @param {InputType} input
 */
export function part2(input) {
	return range(0, Infinity)
    .map((x) => md5(`${input}${x}`))
    .findIndex((x) => x.startsWith("000000"));
}
