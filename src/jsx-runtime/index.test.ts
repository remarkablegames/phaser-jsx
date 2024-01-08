import { Container, createElement } from '..';
import { Fragment, jsx, jsxDEV, jsxs } from '.';

it.each([jsx, jsxDEV, jsxs])('exports %p', (func) => {
  expect(func).toBe(createElement);
});

it('exports Fragment', () => {
  expect(Fragment).toBe(Container);
});
