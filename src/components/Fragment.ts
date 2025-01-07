import type { ReactNode } from 'react';

/**
 * Fragment groups elements without a wrapper node.
 *
 * @param props - Props.
 * @returns - Children.
 */
export function Fragment(props: { children?: ReactNode }) {
  return props.children;
}
