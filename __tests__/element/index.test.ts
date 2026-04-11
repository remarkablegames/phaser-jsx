import { createElement, jsx } from '../../src/element';

it('exports createElement', () => {
  expect(createElement).toBeInstanceOf(Function);
});

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
