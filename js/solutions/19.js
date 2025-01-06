// @ts-check

import { bfs, dfs } from "../modules/graph.js";
import { Lib, PriorityQueue } from "../modules/index.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
e => H
e => O
H => HO
H => OH
O => HH

HOHOHO`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.tuple([
  t.arr(t.tuple([t.str(), t.str()], " => ")),
  t.str(),
]).parse;

/**
 * @param {InputType} input
 */
export function part1([replacements, molecule]) {
  return generateMolecules(replacements, molecule).count();
}

/**
 * @param {[string, string][]} replacements
 * @param {string} molecule
 */
function* generateMolecules(replacements, molecule) {
  const molecules = new Set();

  for (const [from, to] of replacements) {
    const re = new RegExp(from, "g");
    let match;
    while ((match = re.exec(molecule))) {
      const newMolecule =
        molecule.slice(0, match.index) +
        to +
        molecule.slice(match.index + from.length);
      if (!molecules.has(newMolecule)) {
        yield newMolecule;
        molecules.add(newMolecule);
      }
    }
  }
}

/**
 * @param {InputType} input
 */
export function part2([, molecule]) {
  const atoms = [];

  let cur = [molecule[0]];
  for (let i = 1; i < molecule.length; i++) {
    const c = molecule[i];
    if (c === c.toUpperCase()) {
      atoms.push(cur.join(""));
      cur = [c];
    } else {
      cur.push(c);
    }
  }

  const Rns = atoms.filter((n) => n === "Rn").length;
  const Ars = atoms.filter((n) => n === "Ar").length;
  const Ys = atoms.filter((n) => n === "Y").length;

  return atoms.length - Rns - Ars - 2 * Ys - 1;
}
