import { useRef } from './useRef';

it('defaults initial value to null', () => {
  expect(useRef()).toEqual({ current: null });
});

it('creates ref with inital value', () => {
  expect(useRef(true)).toEqual({ current: true });
});

it('sets ref current value', () => {
  const ref = useRef<string>();
  expect(ref).toEqual({ current: null });
  ref.current = 'value';
  expect(ref).toEqual({ current: 'value' });
});
