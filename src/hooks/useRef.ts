import type { RefObject } from 'react';

/**
 * A hook that lets you reference a value that’s not needed for rendering.
 *
 * @param initialValue - The value you want the ref object’s current property to be initially. It can be a value of any type. This argument is ignored after the initial render.
 * @returns - Returns an object with a single property `current` (initially set to the `initialValue` you have passed).
 */
export function useRef<Type = null>(
  initialValue: Type | null = null,
): RefObject<Type | null> {
  return {
    current: initialValue,
  };
}
