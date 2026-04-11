import { createElement } from '..';
import { Fragment, jsx, jsxDEV, jsxs } from '.';

it.each([jsx, jsxs])('exports %s', (fun) => {
  expect(fun).toBe(createElement);
});

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});

type Args = Parameters<typeof createElement>;

it('removes the last 4 arguments for jsxDEV', () => {
  const element = vi.fn();
  const args = [element, {}, undefined, false, undefined, this];
  // eslint-disable-next-line prefer-spread
  expect(jsxDEV.apply(null, args as Args)).toEqual({
    key: null,
    props: {},
    type: element,
  });
});
