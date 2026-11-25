import type { ComponentClass, FC, JSX } from 'react';

import type { Props } from '../types';
import { createElement } from './create';

/**
 * Creates an element using the automatic JSX runtime.
 *
 * @param type - The `type` argument must be a valid component type.
 * @param props - The `props` argument must either be an object or `null`.
 * @param key - The automatic-runtime `key` argument, which is ignored.
 * @returns - Element object with properties `type` and `props`.
 */
export function jsx(
  type: FC | ComponentClass,
  props?: Props | null,
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  key?: unknown,
): JSX.Element {
  return createElement(type, props);
}

/**
 * Alias for `jsx`.
 *
 * {@link jsx}
 */
export const jsxs = jsx;
