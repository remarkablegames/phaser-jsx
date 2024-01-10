import { createRef } from './ref';

it('creates ref', () => {
  expect(createRef()).toEqual({ current: null });
});

it('sets ref', () => {
  type Type = 'value';
  const ref = createRef<Type>();
  ref.current = 'value';
  expect(ref).toEqual({ current: 'value' });
});
