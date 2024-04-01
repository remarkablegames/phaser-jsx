import 'global-jsdom/register';

import { it } from 'node:test';

import assert from 'assert';

import {
  createElement,
  createRef,
  Image,
  jsx,
  render,
  useScene,
  Video,
} from '../cjs/index.js';

[createElement, Image, render, Video, useScene].forEach((fun) => {
  it(`exports ${fun.name}`, () => {
    assert.strictEqual(typeof fun, 'function');
  });
});

it('exports createElement', () => {
  assert.deepEqual(createElement(Image, { x: 42 }), {
    key: null,
    props: { x: 42 },
    type: Image,
  });
});

it('exports createRef', () => {
  assert.deepEqual(createRef(), { current: null });
});

it('exports jsx', () => {
  assert.strictEqual(jsx, createElement);
});
