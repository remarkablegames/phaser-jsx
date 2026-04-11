import {
  createElement,
  createRef,
  Image,
  jsx,
  render,
  useRef,
  useScene,
  Video,
} from '../cjs/index.js';

it.each([createElement, createRef, Image, render, Video, useRef, useScene])(
  'exports %s',
  (fn) => {
    expect(typeof fn).toBe('function');
  },
);

it('exports createElement', () => {
  expect(createElement(Image as React.FC, { x: 42 })).toEqual({
    key: null,
    props: { x: 42 },
    type: Image,
  });
});

it.each([createRef, useRef])('exports %s', (fn) => {
  expect(fn()).toEqual({ current: null });
});

it('exports jsx', () => {
  expect(jsx).toBe(createElement);
});
