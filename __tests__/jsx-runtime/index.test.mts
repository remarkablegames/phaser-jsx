import { createElement } from '../../src/element/create';
import { Fragment, jsx, jsxs } from '../../src/jsx-runtime';

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});

it.each([jsx, jsxs])('exports %s', (fn) => {
  expect(fn.name).toBe(createElement.name);
});
