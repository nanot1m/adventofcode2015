// @ts-check

export const useExample = false;

export const exampleInput = `\
`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = JSON.parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  /**
   * @param {unknown} node
   */
  function recur(node) {
    if (Array.isArray(node)) return node.values().sum(recur);
    if (typeof node === "object") return recur(Object.values(node));
    if (typeof node === "number") return node;
    return 0;
  }
  return recur(input);
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  /**
   * @param {unknown} node
   */
  function recur(node) {
    if (Array.isArray(node)) return node.values().sum(recur);
    if (typeof node === "object") {
      if (Object.values(node).includes("red")) return 0;
      return recur(Object.values(node));
    }
    if (typeof node === "number") return node;
    return 0;
  }
  return recur(input);
}
