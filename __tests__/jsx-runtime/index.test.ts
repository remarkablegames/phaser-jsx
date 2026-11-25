import { createElement } from '../../src';
import { Fragment, jsx, jsxs } from '../../src/jsx-runtime';

it.each([jsx, jsxs])('exports %s', (fn) => {
  expect(fn).not.toBe(createElement);
  expect(fn).toBe(jsx);
  expect(fn).toBeInstanceOf(Function);
});

it('exports Fragment', () => {
  expect(Fragment).toBeInstanceOf(Function);
});

it.each([jsx, jsxs])('discards the key argument %s', (fn) => {
  const type = vi.fn();
  const props = { text: 'hello' };
  expect(fn(type, props, 'key')).toEqual(createElement(type, props));
});

it('aliases jsxs to jsx', () => {
  expect(jsxs).toBe(jsx);
});
