import { Container, createElement } from '..';
import { Fragment, jsx, jsxs } from '.';

it.each([jsx, jsxs])('exports %p', (func) => {
  expect(func).toBe(createElement);
});

it('exports Fragment', () => {
  expect(Fragment).toBe(Container);
});
