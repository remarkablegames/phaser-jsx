import type { ComponentClass, FC, JSX } from 'react';

import type { Props } from '../types';

/**
 * Creates an element.
 *
 * @param type - The `type` argument must be a valid component type.
 * @param props - The `props` argument must either be an object or `null`.
 * @param children - Zero or more child elements.
 * @returns - Element object with properties `type` and `props`.
 */
export function createElement(
  type: FC | ComponentClass,
  props?: Props | null,
  ...children: JSX.Element[]
): JSX.Element {
  if (!props) {
    props = {};
  }

  if (children.length) {
    props.children = children;
  }

  return {
    type,
    props,
    key: null,
  };
}
