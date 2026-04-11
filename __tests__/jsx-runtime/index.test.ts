import { createElement } from '../../src';
import { Fragment, jsx, jsxs } from '../../src/jsx-runtime';

it.each([jsx, jsxs])('exports %s', (fun) => {
  expect(fun).toBe(createElement);
});

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});
