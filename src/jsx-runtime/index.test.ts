import { createElement } from '..';
import { Fragment, jsx, jsxs } from '.';

it.each([jsx, jsxs])('exports %s', (fun) => {
  expect(fun).toBe(createElement);
});

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});
