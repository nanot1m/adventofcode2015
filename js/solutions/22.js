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
 * @typedef {(typeof spells)[number]} Spell
 */

/**
 * @typedef {{ hp: number; damage: number; }} Boss
 */

/**
 * @typedef {{ hp: number; mana: number; armor: number; }} Player
 */

/**
 * @param {Map<string, Spell>} [effects]
 * @returns {Map<string, Spell>}
 */
const createEffectsMap = (effects = new Map()) =>
  new Map(effects.entries().map(([k, v]) => [k, { ...v }]));

/**
 * @typedef {{ player: Player; boss: Boss; manaSpent: number; effects: Map<string, Spell>; }} State
 */

/**
 * @param {State} state
 * @param {number} spellCost
 * @returns {IteratorObject<State>}
 */
function* getNewState(state, spellCost) {
  yield {
    manaSpent: state.manaSpent + spellCost,
    boss: { ...state.boss },
    player: { ...state.player, armor: 0 },
    effects: createEffectsMap(state.effects),
  };
}

/**
 * @param {State} state
 */
function applyEffects({ effects, player, boss }) {
  for (const effect of effects.values()) {
    if (effect.duration === 0) continue;
    player.hp += effect.heal;
    player.armor = effect.armor;
    boss.hp -= effect.damage;
    player.mana += effect.mana;
    effect.duration -= 1;
    if (effect.duration === 0) {
      effects.delete(effect.name);
    }
  }
}

/**
 * @param {State} state
 * @param {Spell} spell
 */
function castSpell({ player, effects, boss }, spell) {
  player.mana -= spell.cost;
  if (spell.duration > 0) {
    effects.set(spell.name, { ...spell });
  } else {
    player.hp += spell.heal;
    player.armor = spell.armor;
    boss.hp -= spell.damage;
    player.mana += spell.mana;
  }
}

/**
 * @param {State} state
 * @param {Spell} spell
 */
function canCastSpell(state, spell) {
  if (state.player.mana < spell.cost) return false;
  if (state.effects.has(spell.name)) return false;
  return true;
}

/**
 * @param {State} state
 * @param {Spell} spell
 * @param {boolean} hardMode
 */
function* playerTurn(state, spell, hardMode) {
  if (hardMode) state.player.hp -= 1;
  if (state.player.hp <= 0) return;
  applyEffects(state);
  castSpell(state, spell);
  yield state;
}

/**
 * @param {State} state
 */
function* bossTurn(state) {
  if (state.boss.hp <= 0) yield state;
  applyEffects(state);
  state.player.hp -= Math.max(1, state.boss.damage - state.player.armor);
  if (state.player.hp > 0) yield state;
}

/**
 * @param {State} state
 */
function stateToHash({ player, boss, manaSpent, effects }) {
  const effectsKey = effects
    .entries()
    .map(([k, v]) => `${k}:${v.duration}`)
    .toArray()
    .join(",");
  return `${player.hp},${player.mana},${player.armor},${boss.hp},${manaSpent}:${effectsKey}`;
}

/**
 * @param {boolean} hardMode
 * @returns {(state: State) => IteratorObject<State>}
 */
function next(hardMode) {
  return (state) => {
    if (state.boss.hp <= 0) return Iterator.from([]);

    return spells
      .values()
      .filter((spell) => canCastSpell(state, spell))
      .flatMap((spell) =>
        getNewState(state, spell.cost)
          .flatMap((state) => playerTurn(state, spell, hardMode))
          .flatMap(bossTurn)
      );
  };
}

/**
 * @param {{ hp: number; mana: number; armor: number }} player
 * @param {{ hp: number; damage: number; }} boss
 */
function simulateFightVariations(player, boss, hardMode = false) {
  const state = { player, boss, manaSpent: 0, effects: createEffectsMap() };
  return bfs([state], next(hardMode), stateToHash);
}

/**
 * @param {InputType} input
 */
export function part1(input) {
  const player = { hp: 50, mana: 500, armor: 0 };

  return simulateFightVariations(player, input)
    .filter((cur) => cur.value.boss.hp <= 0)
    .map((cur) => cur.value.manaSpent)
    .first();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const player = { hp: 50, mana: 500, armor: 0 };

  return simulateFightVariations(player, input, true)
    .filter((cur) => cur.value.boss.hp <= 0)
    .map((cur) => cur.value.manaSpent)
    .first();
}
