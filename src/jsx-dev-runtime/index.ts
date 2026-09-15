import { createElement } from '..';

export { Fragment, jsx, jsx as jsxs } from '..';
export type { JSX } from 'react';

type Args = Parameters<typeof createElement>;

export function jsxDEV(...args: Args) {
  // eslint-disable-next-line prefer-spread
  return createElement.apply(null, args.slice(0, args.length - 4) as Args);
}
