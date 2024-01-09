import { isValidElement } from './valid';

beforeAll(() => {
  jest.spyOn(console, 'warn').mockImplementation();
});

afterAll(() => {
  // eslint-disable-next-line no-console
  (console.warn as jest.Mock).mockRestore();
});

it.each([undefined, null, false, 0])('returns false for value: %p', (value) => {
  expect(isValidElement(value)).toBe(false);
});

it.each([
  {},
  { type: null },
  { type: false },
  { type: 0 },
  { type: 'invalid' },
])('returns false for type: %p', (value) => {
  expect(isValidElement(value)).toBe(false);
});

it('returns true for valid element', () => {
  expect(isValidElement({ type: () => null, props: {}, key: 'key' })).toBe(
    true,
  );
});
