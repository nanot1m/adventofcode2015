// @ts-check

import { PriorityQueue } from "./priority-queue.js";

/**
 * @template T
 *
 * @typedef {Object} PathItem
 * @property {number} distance
 * @property {T} value
 * @property {PathItem<T>} [parent]
 * @property {PathItem<T>[]} predecessors
 * @property {number} length
 */

/**
 * @template T
 *
 * @param {T[]} starts
 * @param {(value: T, step: PathItem<T>) => Iterable<T>} getNext
 * @param {(value: T) => unknown} [valToHash]
 *
 * @returns {IteratorObject<PathItem<T>>}
 */
export function* dfs(starts, getNext, valToHash) {
  /** @type {Map<unknown, PathItem<T>>} */
  const visited = new Map();

  const stack = starts.map(
    (start) =>
      /** @type {PathItem<T>} */ ({
        distance: 0,
        value: start,
        parent: null,
        predecessors: [],
        length: 1,
      })
  );

  while (stack.length) {
    const current = stack.pop();

    if (valToHash) {
      const hash = valToHash(current.value);
      if (visited.has(hash)) {
        const item = visited.get(hash);
        if (current.distance === item.distance) {
          item.predecessors.push(current.parent);
        }
        continue;
      } else {
        visited.set(hash, current);
      }
    }

    yield current;

    for (const next of getNext(current.value, current)) {
      stack.push({
        distance: current.distance + 1,
        value: next,
        parent: current,
        predecessors: [current],
        length: current.length + 1,
      });
    }
  }
}

/**
 * @template T
 *
 * @param {Iterable<T>} starts
 * @param {(value: T, step: PathItem<T>) => Iterable<T>} getNext
 * @param {(value: T) => unknown} [valToHash]
 *
 * @returns {IteratorObject<PathItem<T>>}
 */
export function* bfs(starts, getNext, valToHash) {
  /** @type {Map<unknown, PathItem<T>>} */
  const visited = new Map();

  /** @type {PathItem<T>[]} */
  const queue = [];

  for (const start of starts) {
    queue.push({
      distance: 0,
      value: start,
      parent: null,
      predecessors: [],
      length: 1,
    });
  }

  while (queue.length) {
    const current = queue.shift();

    if (valToHash) {
      const hash = valToHash(current.value);
      if (visited.has(hash)) {
        const item = visited.get(hash);
        if (current.distance === item.distance) {
          item.predecessors.push(current.parent);
        }
        continue;
      } else {
        visited.set(hash, current);
      }
    }

    yield current;

    for (const next of getNext(current.value, current)) {
      queue.push({
        distance: current.distance + 1,
        value: next,
        parent: current,
        predecessors: [current],
        length: current.length + 1,
      });
    }
  }
}

/**
 * @template T
 *
 * @param {Iterable<{value: T, distance: number}>} starts
 * @param {(value: T, step: PathItem<T>) => Iterable<{value: T, distance: number}>} getNext
 * @param {(value: T) => unknown} [valToHash]
 *
 * @returns {IteratorObject<PathItem<T>>}
 */
export function* dijkstra(starts, getNext, valToHash) {
  /** @type {Map<unknown, PathItem<T>>} */
  const visited = new Map();

  /** @type {PriorityQueue<PathItem<T>>} */
  const pq = new PriorityQueue((a, b) => a.distance - b.distance);

  for (const { value, distance } of starts) {
    pq.push({ distance, value, parent: null, predecessors: [], length: 1 });
  }

  while (pq.length) {
    const current = pq.pop();
    if (valToHash) {
      const hash = valToHash(current.value);
      if (visited.has(hash)) {
        const item = visited.get(hash);
        if (current.distance === item.distance) {
          item.predecessors.push(current.parent);
        }
        continue;
      } else {
        visited.set(hash, current);
      }
    }

    yield current;

    for (const { value, distance } of getNext(current.value, current)) {
      pq.push({
        distance: current.distance + distance,
        value: value,
        parent: current,
        predecessors: [current],
        length: current.length + 1,
      });
    }
  }
}

/**
 * @param {PathItem<T>} step
 *
 * @template T
 */
export function* iteratePathBackwards(step) {
  while (step) {
    yield step;
    step = step.parent;
  }
}
