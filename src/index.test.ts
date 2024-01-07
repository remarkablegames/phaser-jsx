import { Container, createElement, jsx, Rectangle, Text } from '.';

it.each([Container, Rectangle, Text, createElement])('exports %p', (func) => {
  expect(func).toBeInstanceOf(Function);
});

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
