import { createElement } from '../../src/element/create';
import { jsx } from '../../src/element/jsx';

function Component() {
  return null;
}

it('exports jsx', () => {
  expect(jsx).not.toBe(createElement);
  expect(jsx).toBeInstanceOf(Function);
});

it('discards the key argument', () => {
  const props = { style: { width: 100, height: 200 } };
  expect(jsx(Component, props, 'key')).toEqual(createElement(Component, props));
});
