import { createRef } from '../../src/ref/createRef';

it('creates ref', () => {
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  expect(createRef()).toEqual({ current: null });
});

it('sets ref', () => {
  type Type = 'value';
  // eslint-disable-next-line @typescript-eslint/no-deprecated
  const ref = createRef<Type>();
  ref.current = 'value';
  expect(ref).toEqual({ current: 'value' });
});
