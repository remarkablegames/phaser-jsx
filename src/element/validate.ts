import type { JSX } from 'react';

/**
 * Validates element.
 *
 * @param element - Element you want to validate.
 */
export function validateElement(element: JSX.Element) {
  if (!element) {
    throw new TypeError(
      `Invalid JSX element. Expected an object but got: ${element}`,
    );
  }

  if (typeof element.type !== 'function') {
    throw new TypeError(
      `Invalid JSX type. Expected a class or function but got: ${element.type}`,
    );
  }
}
