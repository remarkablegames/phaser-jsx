import { createElement } from '../../cjs/element/create.js';
import {
  Fragment,
  jsx,
  jsxDEV,
  jsxs,
} from '../../cjs/jsx-dev-runtime/index.js';

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
