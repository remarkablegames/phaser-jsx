import type { ComponentClass, FC, JSX } from 'react';

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
  props?: React.Attributes | null,
  ...children: JSX.Element[]
) {
  return {
    type,
    props: {
      ...props,
      children,
    },
  };
}

/**
 * Alias for `createElement`.
 *
 * {@link createElement}
 */
export const jsx = createElement;
