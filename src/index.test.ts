import {
  Container,
  createElement,
  jsx,
  Rectangle,
  render,
  Text,
  useScene,
} from '.';

it.each([Container, Rectangle, Text, createElement, render, useScene])(
  'exports %p',
  (fun) => {
    expect(fun).toBeInstanceOf(Function);
  },
);

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
