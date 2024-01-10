import type { Ref } from '../types';

/**
 * Creates a ref object which can contain arbitrary value.
 *
 * @returns - Creates an object with a single property `current` (initially set to `null`).
 */
export function createRef<Type>(): Ref<Type> {
  return {
    current: null,
  };
}
