import { createElement, jsx } from '.';

it('exports createElement', () => {
  expect(createElement).toBeInstanceOf(Function);
});

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
