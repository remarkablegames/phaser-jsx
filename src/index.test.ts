import {
  Container,
  createElement,
  createRef,
  jsx,
  Rectangle,
  render,
  Text,
  useRef,
  useScene,
} from '.';

it.each([
  Container,
  Rectangle,
  Text,
  createElement,
  createRef,
  render,
  useRef,
  useScene,
])('exports %p', (fn) => {
  expect(fn).toBeInstanceOf(Function);
});

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
