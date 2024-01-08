import { Container, createElement, jsx, Rectangle, render, Text } from '.';

it.each([Container, Rectangle, Text, createElement, render])(
  'exports %p',
  (func) => {
    expect(func).toBeInstanceOf(Function);
  },
);

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
