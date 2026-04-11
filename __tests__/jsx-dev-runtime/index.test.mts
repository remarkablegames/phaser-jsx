import { createElement } from '../../src/element/create';
import { Fragment, jsx, jsxDEV, jsxs } from '../../src/jsx-dev-runtime';

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});

it('exports jsxDEV', () => {
  expect(jsxDEV.name).not.toBe(createElement.name);
  expect(jsxDEV).toBeInstanceOf(Function);
});

it.each([jsx, jsxs])('exports %s', (fn) => {
  expect(fn.name).toBe(createElement.name);
});
