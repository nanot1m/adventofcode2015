// @ts-check

import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Hit Points: 103
Damage: 9
Armor: 2`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.tpl`\
Hit Points: ${"hp|int"}
Damage: ${"damage|int"}
Armor: ${"armor|int"}`.parse;

const weapons = [
  { cost: 8, damage: 4, armor: 0 },
  { cost: 10, damage: 5, armor: 0 },
  { cost: 25, damage: 6, armor: 0 },
  { cost: 40, damage: 7, armor: 0 },
  { cost: 74, damage: 8, armor: 0 },
];

const armor = [
  { cost: 13, damage: 0, armor: 1 },
  { cost: 31, damage: 0, armor: 2 },
  { cost: 53, damage: 0, armor: 3 },
  { cost: 75, damage: 0, armor: 4 },
  { cost: 102, damage: 0, armor: 5 },
];

const rings = [
  { cost: 25, damage: 1, armor: 0 },
  { cost: 50, damage: 2, armor: 0 },
  { cost: 100, damage: 3, armor: 0 },
  { cost: 20, damage: 0, armor: 1 },
  { cost: 40, damage: 0, armor: 2 },
  { cost: 80, damage: 0, armor: 3 },
];

function* getCombinations() {
  for (const w of weapons) {
    // only weapon
    yield { cost: w.cost, damage: w.damage, armor: w.armor };

    for (const a of armor) {
      // weapon and armor
      yield {
        cost: w.cost + a.cost,
        damage: w.damage + a.damage,
        armor: w.armor + a.armor,
      };

      for (let i = 0; i < rings.length; i++) {
        // weapon, armor, and ring
        yield {
          cost: w.cost + a.cost + rings[i].cost,
          damage: w.damage + a.damage + rings[i].damage,
          armor: w.armor + a.armor + rings[i].armor,
        };

        for (let j = i + 1; j < rings.length; j++) {
          // weapon, armor, and two rings
          yield {
            cost: w.cost + a.cost + rings[i].cost + rings[j].cost,
            damage: w.damage + a.damage + rings[i].damage + rings[j].damage,
            armor: w.armor + a.armor + rings[i].armor + rings[j].armor,
          };
        }
      }
    }
  }
}

/**
 * @param {InputType} b
 * @param {{damage: number, armor: number}} equipment
 */
function beatsBoss(b, equipment) {
  const p = { hp: 100, ...equipment };

  const playerKillsBothIn = Math.ceil(b.hp / Math.max(1, p.damage - b.armor));
  const bossKillsPlayerIn = Math.ceil(p.hp / Math.max(1, b.damage - p.armor));

  return playerKillsBothIn <= bossKillsPlayerIn;
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  return getCombinations()
    .filter((c) => beatsBoss(input, c))
    .map((c) => c.cost)
    .min();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  return getCombinations()
    .filter((c) => !beatsBoss(input, c))
    .map((c) => c.cost)
    .max();
}
