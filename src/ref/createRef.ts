import type { RefObject } from 'react';

/**
 * Creates a ref object which can contain arbitrary value.
 *
 * @deprecated Use {@link useRef} instead.
 *
 * @returns - Creates an object with a single property `current` (initially set to `null`).
 */
export function createRef<Type>(): RefObject<Type | null> {
  return {
    current: null,
  };
}
