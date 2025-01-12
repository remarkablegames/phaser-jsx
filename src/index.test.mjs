import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

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

[createElement, createRef, Image, render, Video, useRef, useScene].forEach(
  (fn) => {
    it(`exports ${fn.name}`, () => {
      assert.strictEqual(typeof fn, 'function');
    });
  },
);

it('exports createElement', () => {
  assert.deepEqual(createElement(Image, { x: 42 }), {
    key: null,
    props: { x: 42 },
    type: Image,
  });
});

[createRef, useRef].forEach((fn) => {
  it(`exports ${fn.name}`, () => {
    assert.deepEqual(fn(), { current: null });
  });
});

it('exports jsx', () => {
  assert.strictEqual(jsx, createElement);
});
