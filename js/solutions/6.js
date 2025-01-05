// @ts-check

import { range } from "../modules/itertools.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
turn on 0,0 through 999,999`;

const toggleCommandParser =
  t.tpl`toggle ${"x1|int"},${"y1|int"} through ${"x2|int"},${"y2|int"}`.map(
    (l) => ({ type: /** @type {const}  */ ("toggle"), ...l })
  );

const turnCommandParser =
  t.tpl`turn ${"state|str"} ${"x1|int"},${"y1|int"} through ${"x2|int"},${"y2|int"}`.map(
    (l) => ({ type: /** @type {const}  */ ("turn"), ...l })
  );

/** @typedef {ReturnType<typeof parseInput>} InputType */

const lineParser = {
  /**
   * @param {string} line
   * @returns {ReturnType<typeof toggleCommandParser.parse> | ReturnType<typeof turnCommandParser.parse>}
   */
  parse(line) {
    return line.startsWith("toggle")
      ? toggleCommandParser.parse(line)
      : turnCommandParser.parse(line);
  },
};

export const parseInput = t.arr(lineParser, "\n").parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  return input
    .reduce((acc, cmd) => {
      for (const x of range(cmd.x1, cmd.x2 + 1)) {
        for (const y of range(cmd.y1, cmd.y2 + 1)) {
          if (cmd.type === "toggle") {
            acc[y * 1000 + x] = acc[y * 1000 + x] ? 0 : 1;
          } else {
            acc[y * 1000 + x] = cmd.state === "on" ? 1 : 0;
          }
        }
      }
      return acc;
    }, Array(1000 * 1000).fill(0))
    .values()
    .sum();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return input
    .reduce((acc, cmd) => {
      for (const x of range(cmd.x1, cmd.x2 + 1)) {
        for (const y of range(cmd.y1, cmd.y2 + 1)) {
          if (cmd.type === "toggle") {
            acc[y * 1000 + x] += 2;
          } else {
            acc[y * 1000 + x] = Math.max(
              0,
              acc[y * 1000 + x] + (cmd.state === "on" ? 1 : -1)
            );
          }
        }
      }
      return acc;
    }, Array(1000 * 1000).fill(0))
    .values()
    .sum();
}
