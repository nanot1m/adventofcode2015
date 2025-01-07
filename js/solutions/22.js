// @ts-check

import { bfs } from "../modules/graph.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Hit Points: 55
Damage: 8`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

export const parseInput = t.tpl`\
Hit Points: ${"hp|int"}
Damage: ${"damage|int"}`.parse;

// prettier-ignore
const spells = [
	{ name: 'Magic Missile', cost: 53, damage: 4, heal: 0, armor: 0, mana: 0, duration: 0 },
	{ name: 'Drain', cost: 73, damage: 2, heal: 2, armor: 0, mana: 0, duration: 0 },
	{ name: 'Shield', cost: 113, damage: 0, heal: 0, armor: 7, mana: 0, duration: 6 },
	{ name: 'Poison', cost: 173, damage: 3, heal: 0, armor: 0, mana: 0, duration: 6 },
	{ name: 'Recharge', cost: 229, damage: 0, heal: 0, armor: 0, mana: 101, duration: 5 }
];

/**
 * @returns {Map<string, (typeof spells)[number]>}
 */
const createEffectsMap = () => new Map();

/**
 * @param {{ hp: number; mana: number; armor: number }} player
 * @param {{ hp: number; damage: number; }} boss
 */
function simulateFight(player, boss, hardMode = false) {
  return bfs(
    [{ player, boss, manaSpent: 0, effects: createEffectsMap() }],
    ({ player, boss, manaSpent, effects }) => {
      if (player.hp <= 0) return [];
      if (boss.hp <= 0) return [];

      const next = [];
      for (const spell of spells) {
        if (player.mana < spell.cost) continue;

        // Skip if effect is already active
        if (effects.has(spell.name) && effects.get(spell.name).duration > 1) {
          continue;
        }

        const nextManaSpent = manaSpent + spell.cost;
        const nextBoss = { ...boss };
        const nextPlayer = { ...player, armor: 0 };

        // player turn
        if (hardMode) {
          nextPlayer.hp -= 1;
          if (nextPlayer.hp <= 0) continue;
        }

        // Apply effects
        const nextEffects = createEffectsMap();
        for (const effect of effects.values()) {
          if (effect.duration === 0) continue;

          nextPlayer.hp += effect.heal;
          nextPlayer.armor = effect.armor;
          nextBoss.hp -= effect.damage;
          nextPlayer.mana += effect.mana;
          nextEffects.set(effect.name, {
            ...effect,
            duration: effect.duration - 1,
          });
        }

        // Apply spell
        nextPlayer.mana -= spell.cost;
        if (spell.duration > 0) {
          nextEffects.set(spell.name, { ...spell });
        } else {
          nextPlayer.hp += spell.heal;
          nextPlayer.armor = spell.armor;
          nextBoss.hp -= spell.damage;
          nextPlayer.mana += spell.mana;
        }

        if (nextBoss.hp <= 0) {
          next.push({
            player: nextPlayer,
            boss: nextBoss,
            effects: nextEffects,
            manaSpent: nextManaSpent,
          });
          continue;
        }

        // boss turn
        for (const effect of nextEffects.values()) {
          if (effect.duration === 0) continue;

          nextPlayer.hp += effect.heal;
          nextPlayer.armor = effect.armor;
          nextBoss.hp -= effect.damage;
          nextPlayer.mana += effect.mana;
          effect.duration -= 1;
        }
        nextPlayer.hp -= Math.max(1, nextBoss.damage - nextPlayer.armor);

        next.push({
          player: nextPlayer,
          boss: nextBoss,
          effects: nextEffects,
          manaSpent: nextManaSpent,
        });
      }

      return next;
    },
    (cur) =>
      `${cur.player.hp},${cur.player.mana},${cur.boss.hp},${cur.manaSpent}`
  );
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const player = { hp: 50, mana: 500, armor: 0 };

  return simulateFight(player, input)
    .filter((cur) => cur.value.boss.hp <= 0)
    .map((cur) => cur.value.manaSpent)
    .first();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const player = { hp: 50, mana: 500, armor: 0 };

  return simulateFight(player, input, true)
    .filter((cur) => cur.value.boss.hp <= 0)
    .map((cur) => cur.value.manaSpent)
    .first();
}
