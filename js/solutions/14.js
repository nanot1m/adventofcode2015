// @ts-check

import { isInRange } from "../modules/lib.js";
import { t } from "../modules/parser.js";

export const useExample = false;

export const exampleInput = `\
Dancer can fly 27 km/s for 5 seconds, but then must rest for 132 seconds.
Cupid can fly 22 km/s for 2 seconds, but then must rest for 41 seconds.
Rudolph can fly 11 km/s for 5 seconds, but then must rest for 48 seconds.
Donner can fly 28 km/s for 5 seconds, but then must rest for 134 seconds.
Dasher can fly 4 km/s for 16 seconds, but then must rest for 55 seconds.
Blitzen can fly 14 km/s for 3 seconds, but then must rest for 38 seconds.
Prancer can fly 3 km/s for 21 seconds, but then must rest for 40 seconds.
Comet can fly 18 km/s for 6 seconds, but then must rest for 103 seconds.
Vixen can fly 18 km/s for 5 seconds, but then must rest for 84 seconds.`;

/** @typedef {ReturnType<typeof parseInput>} InputType */

const lineParser = t.tpl`${"name|str"} can fly ${"speed|int"} km/s for ${"duration|int"} seconds, but then must rest for ${"rest|int"} seconds.`;

export const parseInput = t.arr(lineParser).parse;

/**
 * @param {InputType} input
 */
export function part1(input) {
  return input
    .values()
    .map(({ speed, duration, rest }) => {
      const timePeriod = duration + rest;
      const fullPeriods = Math.floor(2503 / timePeriod);
      const remainingTime = 2503 % timePeriod;
      const fullDistance = fullPeriods * duration * speed;
      const remainingDistance = Math.min(remainingTime, duration) * speed;
      return fullDistance + remainingDistance;
    })
    .max();
}

/**
 * @param {InputType} input
 */
export function part2(input) {
  const scores = new Map();
  const distances = new Map();

  for (const { name } of input) {
    scores.set(name, 0);
    distances.set(name, 0);
  }

  for (let second = 1; second <= 2503; second++) {
    for (const { name, speed, duration, rest } of input) {
      const timePeriod = duration + rest;
      const timeInPeriod = second % timePeriod;
      if (isInRange(timeInPeriod, 1, duration)) {
        distances.set(name, distances.get(name) + speed);
      }
    }

    const maxDistance = distances.values().max();
    for (const [name, distance] of distances) {
      if (distance === maxDistance) {
        scores.set(name, scores.get(name) + 1);
      }
    }
  }

  return scores.values().max();
}
