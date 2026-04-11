import { createElement } from '../../cjs/element/create.js';
import { Fragment, jsx, jsxs } from '../../cjs/jsx-runtime/index.js';

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});

it.each([jsx, jsxs])('exports %s', (fn) => {
  expect(fn.name).toBe(createElement.name);
});
