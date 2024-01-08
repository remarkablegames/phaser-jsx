import { createElement } from '..';

export { Container as Fragment, jsx, jsx as jsxs } from '..';

type Args = Parameters<typeof createElement>;

export function jsxDEV(...args: Args) {
  // eslint-disable-next-line prefer-spread
  return createElement.apply(null, args.slice(0, args.length - 4) as Args);
}
