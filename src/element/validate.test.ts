import type { JSX } from 'react';

import { validateElement } from './validate';

it.each([undefined, null, false, 0])(
  'throws error for element: %p',
  (element) => {
    expect(() => {
      validateElement(element as unknown as JSX.Element);
    }).toThrow(`Invalid JSX element. Expected an object but got: ${element}`);
  },
);

it.each([
  {},
  { type: null },
  { type: false },
  { type: 0 },
  { type: 'invalid' },
])('throws error for type: %p', (element) => {
  expect(() => {
    validateElement(element as unknown as JSX.Element);
  }).toThrow(
    `Invalid JSX type. Expected a class or function but got: ${element.type}`,
  );
});

it('does not throw for valid element', () => {
  expect(() => {
    validateElement({ type: () => null, props: {}, key: 'key' });
  }).not.toThrow();
});
