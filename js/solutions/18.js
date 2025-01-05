// @ts-check

import { Array2d as A, V } from "../modules/index.js";
import { iterate } from "../modules/itertools.js";

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = A.parse;

/**
 * @param {InputType} input
 */
function next(input) {
  const nextInput = A.create(A.width(input), A.height(input), (pos) => {
    const current = A.get(input, pos);
    const neighbors = V.DIRS_8.values()
      .map((dir) => V.add(pos, dir))
      .filter((p) => A.get(input, p) === "#")
      .count();

    if (current === "#" && neighbors !== 2 && neighbors !== 3) return ".";
    if (current === "." && neighbors === 3) return "#";
    return current;
  });
  return nextInput;
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return iterate(input, next)
    .skip(100)
    .first()
    .flat()
    .filter((x) => x === "#").length;
}

/**
 * @param {InputType} input
 */
function next2(input) {
  const corners = [
    V.vec(0, 0),
    V.vec(A.width(input) - 1, 0),
    V.vec(0, A.height(input) - 1),
    V.vec(A.width(input) - 1, A.height(input) - 1),
  ];

  corners.forEach((corner) => A.set(input, corner, "#"));

  const nextInput = A.create(A.width(input), A.height(input), (pos) => {
    if (corners.some((corner) => V.eq(corner, pos))) return "#";

    const current = A.get(input, pos);
    const neighbors = V.DIRS_8.values()
      .map((dir) => V.add(pos, dir))
      .filter((p) => A.get(input, p) === "#")
      .count();

    if (current === "#" && neighbors !== 2 && neighbors !== 3) return ".";
    if (current === "." && neighbors === 3) return "#";
    return current;
  });

  return nextInput;
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return iterate(input, next2)
    .skip(100)
    .first()
    .flat()
    .filter((x) => x === "#").length;
}
